import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
