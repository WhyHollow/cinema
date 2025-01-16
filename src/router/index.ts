import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/HomePage.vue') },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import('../pages/MovieDetails.vue'),
  },
  { path: '/genres', name: 'Genres', component: () => import('../pages/GenresPage.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../pages/ContactPage.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
