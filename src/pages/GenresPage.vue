<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const genres = ref([
  {
    id: 0,
    name: 'Екшн',
    description: 'Напружені сцени, вибухи та екшн у кожному кадрі.',
    image: '/images/action.jpg',
  },
  {
    id: 1,
    name: 'Пригоди',
    description: 'Відкрийте для себе нові світи та незабутні подорожі.',
    image: '/images/adventure.jpg',
  },
  {
    id: 2,
    name: 'Комедія',
    description: 'Сміх, радість та гумор у кожній історії.',
    image: '/images/comedy.jpg',
  },
  {
    id: 3,
    name: 'Драма',
    description: 'Глибокі емоції та незабутні моменти.',
    image: '/images/drama.jpg',
  },
  {
    id: 4,
    name: 'Хорор',
    description: 'Страх і напруження, що залишають вас у захваті.',
    image: '/images/horror.jpg',
  },
  {
    id: 5,
    name: 'Вестерн',
    description: 'Розповіді про ковбоїв, пустелі та Дикий Захід.',
    image: '/images/western.jpg',
  },
])

const viewGenre = (id: number) => {
  router.push({ name: 'HomePage', query: { genre: id } })
}
</script>

<template>
  <div class="min-h-screen pb-8">
    <h1 class="text-3xl font-bold text-center mt-6 mb-8">Жанри</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="genre in genres"
        :key="genre.id"
        class="border rounded overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
      >
        <div class="h-40 bg-gray-100 flex items-center justify-center">
          <img :src="genre.image" :alt="genre.name" class="h-full w-full object-cover" />
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h2 class="text-lg font-bold truncate">{{ genre.name }}</h2>
          <p class="text-gray-600 text-sm mt-2 flex-grow">{{ genre.description }}</p>
          <router-link
            :to="{ name: 'Home', params: { id: genre.id } }"
            class="bg-blue-500 text-white px-3 py-1 rounded mt-4 hover:bg-blue-600 self-start inline-block text-center"
          >
            Переглянути
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #1a202c;
}
</style>
