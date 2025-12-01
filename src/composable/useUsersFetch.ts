import { inject, ref, type Ref } from "vue";
import type { User } from "../types/user";
import { UsersService } from "../services/UsersService";

export function useUsersFetch(users: Ref<User[]>) {
    const usersService = inject<UsersService>('usersService')
    const loading = ref(false)
    const error = ref('')

    async function getAll() {
        try {
            loading.value = true
            const usersList = await usersService?.getUsers()
            users.value = usersList ?? []
        }
        catch (err) {
            error.value = 'Erreur'
        }
        finally {
            loading.value = false
        }
    } 

    return {
        getAll,
        loading,
        error
    }
}