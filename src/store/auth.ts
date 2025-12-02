import { defineStore } from "pinia";
import { computed, inject, ref } from "vue";
import { AuthService, KEY_TOKEN } from "../services/AuthService";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(KEY_TOKEN))
    const authService = inject<AuthService>('authService')
    const hasToken = computed(() => !!token.value)

    return {
        token,
        hasToken,
        async login(email: string, password: string) {
            token.value = (await authService?.login(email, password) as string)
        }
    }
})