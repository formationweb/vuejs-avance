import { ref } from "vue";
import { useAuthStore } from "../store/auth";

export function useAuth() {
    const email = ref('host@example.com')
    const password = ref('password123')
    const { login } = useAuthStore()

    return {
        email,
        password,
        submitAuth() {
            return login(email.value, password.value)
        }
    }
}