import { inject, ref, type Ref } from "vue";
import { authToken } from "../token";

export type AuthReturn = {
    email: Ref<string>
    password: Ref<string>
    token: Ref<string>
    submitAuth: () => Promise<void>
}

export function useAuth(): AuthReturn {
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