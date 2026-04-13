import { inject, ref } from "vue"
import type { User } from "../types/user"
import type { UsersService } from "../services/users"
import { usersServiceToken } from "../token"

export function useUserFetch() {
    const users = ref<User[]>([])
    const loading = ref(true)
    const error = ref('')
    const usersService = inject<UsersService>(usersServiceToken)

    async function getAll() {
        try {
            users.value = (await usersService?.getAll()) ?? []
        }
        catch (err: any) {
            error.value = err.message
        }
        finally {
            loading.value = false
        }
    }

    return {
        users,
        error,
        loading,
        getAll
    }
}