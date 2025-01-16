<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axios";

const searchQuery = ref<string>("");
const selectedGenre = ref<number | null>(null);
const searchResults = ref<{ id: number; name: string; genre: string }[]>([]);
const isLoading = ref<boolean>(false);
const genres = {
  0: "ACTION",
  1: "ADVENTURES",
  2: "COMEDY",
  3: "DRAMA",
  4: "HORROR",
  5: "WESTERNS",
};

const router = useRouter();

const findMovies = async () => {
  isLoading.value = true;
  searchResults.value = [];
  try {
    const params: Record<string, string | number | undefined> = {};

    if (searchQuery.value) {
      params.name = searchQuery.value;
    }

    if (selectedGenre.value !== null) {
      params.genres = selectedGenre.value;
    }

    const response = await api.get("/movies", { params });
    searchResults.value = response.data;
  } catch (error) {
    console.error("Помилка при пошуку фільмів:", error);
  } finally {
    isLoading.value = false;
  }
};

const goToMovie = (movieId: number) => {
  router.push({ name: "movieDetails", params: { id: movieId } });
};
</script>

<template>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук фільму за назвою"
        class="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        v-model="selectedGenre"
        class="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Усі жанри</option>
        <option v-for="(name, id) in genres" :key="id" :value="id">
          {{ name }}
        </option>
      </select>
      <button
        @click="findMovies"
        class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        Пошук
      </button>
    </div>

    <div v-if="isLoading" class="text-blue-600">Завантаження...</div>

    <div v-if="searchResults.length > 0" class="grid grid-cols-1 gap-4">
      <div
        v-for="movie in searchResults"
        :key="movie.id"
        @click="goToMovie(movie.id)"
        class="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer transition"
      >
        <h3 class="text-lg font-bold">{{ movie.name }}</h3>
        <p class="text-gray-600">Жанр: {{ genres[+movie.genre] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
