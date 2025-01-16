import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios'
import type { Movie, ApiResponse, Session, Place, BookingResponse, Row } from '@/types/Movie'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const currentPage = ref(1)
  const pageSize = ref(8)
  const movie = ref<Movie | null>(null)
  const sessions = ref<Session[]>([])
  const availablePlaces = ref<Row[]>([])
  const bookingStatus = ref<BookingResponse | null>(null)
  const selectedSession = ref<{ movieId: number; showdate: string; daytime: string } | null>(null)
  const parsedAdditional = ref<Record<string, string>>({})

  const totalPages = computed(() => Math.ceil(movies.value.length / pageSize.value))
  const sortMovies = (sortBy: 'name' | 'rating' | 'period') => {
    if (sortBy === 'name') {
      movies.value.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'rating') {
      movies.value.sort((a, b) => (b.rating || 0) - (a.rating || 0)) // За спаданням рейтингу
    }
  }
  const getMoviesByPage = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return movies.value.slice(start, start + pageSize.value)
  })

  const fetchMovies = async (): Promise<void> => {
    try {
      const response = await api.get<ApiResponse>('/movies')
      movies.value = response.data.data.map((movie) => {
        const parsedData = parseAdditional(movie.additional)
        return {
          ...movie,
          rating: parseFloat(parsedData['Рейтинг Imdb'] || '0'),
        }
      })

      movies.value = movies.value.sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      console.error('Помилка завантаження фільмів:', error)
    }
  }
  const fetchMovieDetails = async (movieId: number) => {
    try {
      const response = await api.get(`/movies/`, { params: { movie_id: movieId } })
      movie.value = response.data.data[0]
      parseAdditional(movie.value?.additional)
    } catch (error) {
      console.error('Failed to fetch movie details:', error)
    }
  }
  const parsePeriod = (period: string): { start: Date; end: Date } | null => {
    const match = period.match(/(\d{2}\.\d{2}\.\d{4}) - (\d{2}\.\d{2}\.\d{4})/)
    if (!match) return null

    const [_, start, end] = match
    return {
      start: new Date(start.split('.').reverse().join('-')),
      end: new Date(end.split('.').reverse().join('-')),
    }
  }
  const parseAdditional = (html: string | undefined): Record<string, string> => {
    if (!html) return {}
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const result: Record<string, string> = {}

    const items = doc.querySelectorAll('li')
    items.forEach((item) => {
      const key = item.querySelector('.key')?.textContent?.trim()
      const value = item.querySelector('.val')?.textContent?.trim()
      if (key && value) {
        result[key.replace(':', '').trim()] = value
      }
    })

    parsedAdditional.value = result
    return result
  }

  const fetchSessions = async (movieId: number) => {
    try {
      const response = await api.get(`/movieShows`, { params: { movie_id: movieId } })
      sessions.value = response.data.data[movieId]
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  const fetchAvailablePlaces = async (movieId: number, showdate: string, daytime: string) => {
    try {
      const response = await api.get('/showPlaces', {
        params: { movie_id: movieId, showdate, daytime },
      })
      setSelectedSession(movieId, showdate, daytime)
      availablePlaces.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch available places:', error)
    }
  }
  const setSelectedSession = (movieId: number, showdate: string, daytime: string) => {
    selectedSession.value = { movieId, showdate, daytime }
  }

  const bookPlace = async (movieId: number, place: Place, showdate: string, daytime: string) => {
    try {
      const response = await api.post('/bookPlace', {
        movie_id: movieId,
        row: place.row,
        seat: place.seat,
        showdate,
        daytime,
      })
      bookingStatus.value = response.data.data
      setTimeout(() => {
        bookingStatus.value = null
      }, 5000)
    } catch (error) {
      console.error('Failed to book place:', error)
    }
  }

  return {
    movies,
    currentPage,
    pageSize,
    totalPages,
    fetchMovies,
    sortMovies,
    getMoviesByPage,
    movie,
    sessions,
    availablePlaces,
    bookingStatus,
    fetchMovieDetails,
    fetchSessions,
    fetchAvailablePlaces,
    bookPlace,
    selectedSession,
    setSelectedSession,
    parsedAdditional,
  }
})
