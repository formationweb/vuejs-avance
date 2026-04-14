import { inject, ref } from "vue";
import { authToken } from "../token";

export function useAuth() {
    const email = ref('host@example.com')
    const password = ref('password123')
    const token = ref('')
    const authService = inject(authToken)

    async function submitAuth() {
        token.value = (await authService?.login(email.value, password.value)) ?? ''
    }

    return {
        email,
        password,
        token,
        submitAuth
    }
}