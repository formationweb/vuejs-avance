import { inject, ref, type Ref } from "vue";
import { authToken } from "../token";
import { useAuthStore } from "../stores/auth";

export type AuthReturn = {
    email: Ref<string>
    password: Ref<string>
    token: Ref<string>
    submitAuth: () => Promise<void>
}

export function useAuth(): AuthReturn {
    const email = ref('host@example.com')
    const password = ref('password123')
    const authStore = useAuthStore()
    const authService = inject(authToken)

    async function submitAuth() {
       const token = await authService?.login(email.value, password.value)
       authStore.setToken(token ?? '')
    }

    return {
        email,
        password,
        submitAuth
    }
}