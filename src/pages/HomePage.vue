<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/moviesStore'
import SanitizedText from '@/components/sanitized-text.vue'
import OptimizedImage from '@/components/optimized-image.vue'

const store = useMoviesStore()

const genres = ref([
  { id: 0, name: 'Екшн' },
  { id: 1, name: 'Пригоди' },
  { id: 2, name: 'Комедія' },
  { id: 3, name: 'Драма' },
  { id: 4, name: 'Хорор' },
  { id: 5, name: 'Вестерн' },
])

const selectedGenre = ref<number | null>(null)
const sortBy = ref<'name' | 'rating'>('name')
const currentPage = ref(1)
const totalPages = computed(() => store.totalPages)

const moviesOnPage = computed(() => {
  const filtered =
    selectedGenre.value !== null
      ? store.getMoviesByPage.filter((movie) => movie.genre === selectedGenre.value)
      : store.getMoviesByPage

  return filtered
})

const fetchMovies = async () => {
  await store.fetchMovies()
}

const changePage = (page: number) => {
  currentPage.value = page
  store.currentPage = page
}

const filterByGenre = () => {
  currentPage.value = 1
  store.currentPage = 1
}

const sortMovies = () => {
  store.sortMovies(sortBy.value)
}

const viewDetails = (id: number) => {
  console.log(`Перейти до фільму з ID: ${id}`)
}

onMounted(() => {
  fetchMovies()
})

const pagination = computed(() => {
  const pages: number[] = []
  const maxVisiblePages = 5
  const startPage = Math.max(currentPage.value - Math.floor(maxVisiblePages / 2), 1)
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Фільми</h2>
      <div class="flex items-center gap-4">
        <select v-model="selectedGenre" @change="filterByGenre" class="border rounded px-2 py-1">
          <option :value="null">Всі жанри</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
        <select v-model="sortBy" @change="sortMovies" class="border rounded px-2 py-1">
          <option value="name">А-Я</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>
    </div>
    <div v-if="moviesOnPage.length === 0" class="text-center text-gray-500 mt-10">
      <p class="text-lg">Фільми відсутні за заданими критеріями.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="movie in moviesOnPage"
        :key="movie.id"
        class="border rounded overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
      >
        <div class="h-64 bg-gray-100 flex items-center justify-center">
          <OptimizedImage
            :url="movie.image"
            :alt="movie.name"
            class="h-full w-full object-contain"
          />
        </div>

        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-lg font-bold truncate">{{ movie.name }}</h3>
          <p v-if="movie.rating !== 0">Рейтинг: {{ movie.rating }}</p>

          <div class="flex-grow">
            <SanitizedText :rawText="movie.description" class="line-clamp-3" />
          </div>
          <router-link
            :to="{ name: 'MovieDetails', params: { id: movie.id } }"
            class="bg-blue-500 text-white px-3 py-1 rounded mt-4 hover:bg-blue-600 self-start"
          >
            Детальніше
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="moviesOnPage.length !== 0" class="flex justify-center mt-8 items-center space-x-2">
      <button
        :disabled="currentPage === 1"
        class="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        @click="changePage(currentPage - 1)"
      >
        Назад
      </button>

      <button
        v-for="page in pagination"
        :key="page"
        :class="[
          'px-4 py-2 border rounded hover:bg-gray-200',
          currentPage === page ? 'bg-blue-500 text-white' : '',
        ]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200"
        @click="changePage(currentPage + 1)"
      >
        Далі
      </button>
    </div>
  </div>
</template>
