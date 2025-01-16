<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/moviesStore'
import OptimizedImage from '@/components/optimized-image.vue'
import SanitizedText from '@/components/sanitized-text.vue'
import SessionPicker from '@/components/session-picker.vue'
import PlacePicker from '@/components/place-picker.vue'

const route = useRoute()
const movieId = Number(route.params.id)
const store = useMoviesStore()

const showPlaces = ref(false)

const fetchAvailablePlaces = async ({
  showdate,
  daytime,
}: {
  showdate: string
  daytime: string
}) => {
  await store.fetchAvailablePlaces(movieId, showdate, daytime)
  showPlaces.value = true
}

const bookPlace = async (place: { row: number; seat: number }) => {
  const { selectedSession } = store
  if (!selectedSession) return

  await store.bookPlace(movieId, place, selectedSession.showdate, selectedSession.daytime)
}

onMounted(async () => {
  await store.fetchMovieDetails(movieId)
  await store.fetchSessions(movieId)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="store.movie" class="mb-8">
      <div class="flex flex-col gap-6">
        <OptimizedImage
          :url="store.movie.image"
          :alt="store.movie.name"
          class="w-full lg:w-1/3 h-auto rounded shadow-md"
        />
        <div class="flex flex-col flex-grow">
          <h1 class="text-3xl font-bold mb-4">{{ store.movie.name }}</h1>
          <SanitizedText :rawText="store.movie.description" class="text-gray-700 mb-6" />
          <div v-if="store.parsedAdditional">
            <h2 class="text-xl font-bold mb-4">Додаткова інформація</h2>
            <ul>
              <li v-for="(value, key) in store.parsedAdditional" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.sessions.length" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Сеанси</h2>
      <SessionPicker :sessions="store.sessions" @selectTime="fetchAvailablePlaces" />
    </div>

    <PlacePicker v-if="showPlaces" :rows="store.availablePlaces" @bookPlace="bookPlace" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
