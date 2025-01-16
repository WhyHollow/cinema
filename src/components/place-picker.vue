<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useMoviesStore } from '@/stores/moviesStore'

defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
}>()

const bookingSuccess = ref<null | {
  movie_id: string
  row: string
  seat: string
  showdate: string
  daytime: string
  ticketkey: string
}>(null)

const emit = defineEmits(['bookPlace'])

const store = useMoviesStore()
const selectedSeat = ref<{ row: number; seat: number } | null>(null)

const handleSelectSeat = (row: number, seat: number) => {
  selectedSeat.value = { row, seat }
}

const confirmBooking = () => {
  if (selectedSeat.value) {
    emit('bookPlace', selectedSeat.value)
    selectedSeat.value = null
  }
}
</script>

<template>
  <div class="space-y-6">
    <div v-for="row in rows" :key="row[0].row" class="p-6 border rounded-lg shadow-md bg-white">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Ряд {{ row[0].row }}</h3>
      <div class="grid grid-cols-8 gap-3">
        <button
          v-for="seat in row[1]"
          :key="seat.seat"
          :disabled="!seat.is_free"
          :class="{
            'bg-blue-500 text-white':
              selectedSeat?.row === row[0].row && selectedSeat?.seat === seat.seat,
            'hover:bg-blue-500 hover:text-white': seat.is_free,
            'bg-gray-300 text-gray-700': !seat.is_free,
            'border-gray-300 text-gray-700': true,
          }"
          class="px-3 py-2 text-sm font-medium rounded-lg border transition duration-200 ease-in-out"
          @click="handleSelectSeat(row[0].row, seat.seat)"
        >
          {{ seat.seat }}
        </button>
      </div>

      <div
        v-if="selectedSeat?.row === row[0].row"
        class="mt-4 p-4 border rounded-lg shadow-md bg-white"
      >
        <h3 class="text-lg font-semibold text-gray-800">Вибране місце</h3>
        <p class="text-gray-700">Ряд: {{ selectedSeat?.row }}, Місце: {{ selectedSeat?.seat }}</p>
        <button
          class="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
          @click="confirmBooking"
        >
          Підтвердити бронювання
        </button>
      </div>
      <div
        v-if="store.bookingStatus"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="p-6 bg-white rounded-lg shadow-lg w-96">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Бронювання успішне!</h3>
          <p class="text-gray-700">
            <strong>Фільм ID:</strong> {{ store.bookingStatus?.movie_id }}
          </p>
          <p class="text-gray-700">
            <strong>Ряд:</strong> {{ store.bookingStatus?.row }}, <strong>Місце:</strong>
            {{ store.bookingStatus?.seat }}
          </p>
          <p class="text-gray-700"><strong>Дата:</strong> {{ store.bookingStatus?.showdate }}</p>
          <p class="text-gray-700"><strong>Час:</strong> {{ store.bookingStatus?.daytime }}</p>
          <p class="text-gray-700">
            <strong>Ключ квитка:</strong> {{ store.bookingStatus?.ticketkey }}
          </p>
          <button
            class="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
            @click="bookingSuccess = null"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
}
</style>
