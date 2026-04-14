import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import Login from '../pages/Login.vue'
import { useAuthStore } from '../stores/auth'
import Main from '../layouts/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '',
    component: Main,
    meta: {
      requiredAuth: true
    },
    name: 'home'
  }, {
    path: '/login',
    component: Login,
    name: 'loginId'
  }],
})

router.beforeEach((to, from, next) => {
  const { hasToken } = useAuthStore()
   if (!hasToken && to.meta.requiredAuth) {
     next({
       name: 'loginId'
     })
     return
   }
   next()
})

export default router
