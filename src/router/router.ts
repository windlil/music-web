import { createRouter, createWebHistory } from 'vue-router'

const route = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    redirect: '/main/home',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: 'user',
        component: () => import('@/views/user/user.vue'),
      },
      {
        path: 'media',
        component: () => import('@/views/media/media.vue'),
      },
    ],
  },
  {
    path: '/detail-song',
    component: () => import('@/views/detail/detail-song.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

export default router
