import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/Users.vue'
import Login from '../pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '',
    component: Users
  }, {
    path: '/login',
    component: Login
  }],
})

export default router
