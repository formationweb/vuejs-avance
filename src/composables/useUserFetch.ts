import { inject, ref } from "vue"
import type { User } from "../types/user"
import type { UsersService } from "../services/users"
import { usersServiceToken } from "../token"
import { useUserStore } from "../stores/user"
import { storeToRefs } from "pinia"

export function useUserFetch() {
    const userStore = useUserStore()
    const { usersFiltered: users } = storeToRefs(userStore)
    const loading = ref(true)
    const error = ref('')
    const usersService = inject<UsersService>(usersServiceToken)

    async function getAll() {
        try {
            const users = (await usersService?.getAll()) ?? []
            userStore.setUsers(users)
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