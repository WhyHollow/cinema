<script lang="ts" setup>
import { ref } from 'vue'

const contacts = ref([
  {
    name: 'Головний офіс',
    address: 'м. Київ, вул. Хрещатик, N',
    phone: '+380 44 *** ****',
    email: 'info@company.com',
  },
  {
    name: 'Філія у Львові',
    address: 'м. Львів, проспект Свободи, N',
    phone: '+380 32 *** ****',
    email: 'lviv@company.com',
  },
  {
    name: 'Філія в Одесі',
    address: 'м. Одеса, вул. Дерибасівська, N',
    phone: '+380 48 *** ****',
    email: 'odesa@company.com',
  },
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold text-center mb-6">Контакти</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(contact, index) in contacts"
        :key="index"
        class="border rounded shadow-md p-6 hover:shadow-lg transition"
      >
        <h3 class="text-lg font-bold mb-2">{{ contact.name }}</h3>
        <p class="text-gray-600 mb-2">
          <span class="font-semibold">Адреса:</span> {{ contact.address }}
        </p>
        <p class="text-gray-600 mb-2">
          <span class="font-semibold">Телефон:</span> {{ contact.phone }}
        </p>
        <p class="text-gray-600">
          <span class="font-semibold">Електронна пошта:</span>
          <a :href="'mailto:' + contact.email" class="text-blue-500 hover:underline">
            {{ contact.email }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
