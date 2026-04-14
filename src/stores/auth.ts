import { defineStore } from "pinia";
import { computed, ref } from "vue";

const TOKEN_KEY = 'token'

export const useAuthStore = defineStore('auth', () => {
    // state
    const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')

    // getter
    const hasToken = computed(() => !!token.value)

    // action
    function setToken(val: string) {
        token.value = val
        localStorage.setItem(TOKEN_KEY, val)
    }

    return {
        token,
        hasToken,
        setToken
    }
})