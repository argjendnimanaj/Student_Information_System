import { useAuthStore } from '@/stores/auth'
import NotFound from '@/views/error/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => ({ name: 'login' }),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      //() => import(...) -> used for lazy loading views
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('../views/StudentsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const { token } = authStore

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  if (to.path === '/login' && token) {
    return '/students'
  }
})

export default router
