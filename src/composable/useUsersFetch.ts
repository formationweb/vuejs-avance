import { inject, ref, type Ref } from "vue";
import type { User } from "../types/user";
import { UsersService } from "../services/UsersService";
import { useUsersStore } from "../store/users";
import { storeToRefs } from "pinia";

export function useUsersFetch() {
    const loading = ref(false)
    const error = ref('')
    const usersStore = useUsersStore()

    async function getAll() {
        try {
            loading.value = true
            await usersStore.getUsers()
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