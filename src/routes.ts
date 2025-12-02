import { createRouter, createWebHistory } from "vue-router";
import Users from "./components/Users.vue";
import Login from "./pages/Login.vue";
import { inject } from "vue";
import type { AuthService } from "./services/AuthService";
import { useAuthStore } from "./store/auth";

export const routes = [
    {
        path: '',
        component: Users,
        meta: {
            requiredAuth: true
        },
        name: 'home'
    },
    {
        path: '/login',
        component: Login,
        name: 'loginId'
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const { hasToken } = useAuthStore()
    if (to.meta.requiredAuth && !hasToken) {
        next({
            name: 'loginId'
        })
        return
    }
    next()
})