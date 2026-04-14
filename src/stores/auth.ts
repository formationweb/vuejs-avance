import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    // state
    const token = ref('')

    // getter
    const hasToken = computed(() => !!token.value)

    // action
    function setToken(val: string) {
        token.value = val
    }

    return {
        token,
        hasToken,
        setToken
    }
})