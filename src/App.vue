<script lang="ts" setup>
import SearchMovie from "@/components/search-movie.vue";
</script>

<template>
  <div id="app" class="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white py-4 shadow-md">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-lg font-bold">Yellow Media</h1>
        <!-- <search-movie /> -->
        <nav>
          <ul class="flex gap-4">
            <li>
              <router-link to="/" class="hover:underline">Головна</router-link>
            </li>
            <li>
              <router-link to="/genres" class="hover:underline"
                >Жанри</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="hover:underline"
                >Контакти</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-1 container mx-auto px-4 py-6">
      <router-view />
    </main>

    <footer class="bg-blue-600 text-white py-4 text-center">
      <p>© 2025 Yellow Media. Всі права захищені.</p>
    </footer>
  </div>
</template>

<style></style>
