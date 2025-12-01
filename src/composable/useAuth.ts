import { inject, ref } from "vue";
import { AuthService } from "../services/AuthService";

export function useAuth() {
    const email = ref('')
    const password = ref('')
    const authService = inject<AuthService>('authService')

    async function login() {
        await authService?.login(email.value, password.value)
    }

    return {
        email,
        password,
        login
    }
}