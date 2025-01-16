<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'

interface Session {
  showdate: string
  daytime: string
}

const props = defineProps<{
  sessions: Session[]
}>()

const emits = defineEmits<{
  (e: 'selectTime', payload: { showdate: string; daytime: string }): void
}>()

const selectedDate = ref('')
const selectedTime = ref('')

const availableTimes = computed(() => {
  const session = props.sessions.find((s) => s.showdate === selectedDate.value)
  return session ? session.daytime.split(';') : []
})

const selectTime = (time: string) => {
  selectedTime.value = time
  emits('selectTime', { showdate: selectedDate.value, daytime: time })
}
</script>

<template>
  <div>
    <div class="mb-4">
      <label for="datePicker" class="block text-lg font-semibold mb-2">Оберіть дату:</label>
      <select id="datePicker" v-model="selectedDate" class="border rounded px-4 py-2">
        <option value="" disabled>Оберіть дату</option>
        <option v-for="session in sessions" :key="session.showdate" :value="session.showdate">
          {{ session.showdate }}
        </option>
      </select>
    </div>

    <div v-if="availableTimes.length" class="mb-4">
      <label for="timePicker" class="block text-lg font-semibold mb-2">Оберіть час:</label>
      <ul class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        <li
          v-for="time in availableTimes"
          :key="time"
          class="border rounded p-2 text-center shadow-md hover:shadow-lg transition cursor-pointer"
          :class="{
            'bg-blue-500 text-white': time === selectedTime,
            'border-gray-300 text-gray-700 hover:bg-gray-100': time !== selectedTime,
          }"
          @click="selectTime(time)"
        >
          {{ time }}
        </li>
      </ul>
    </div>
  </div>
</template>
