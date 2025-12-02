import { useUsersStore } from './../store/users';
import { computed, ref, type Ref } from "vue";
import type { User } from "../types/user";
import { storeToRefs } from 'pinia';

export function useSearch() {
    const usersStore = useUsersStore()
    const { users } = storeToRefs(usersStore)
    const search = ref('')
    const usersFiltered = computed(() => {
        return users.value.filter(user => user.name.includes(search.value))
    })
    return {
        usersFiltered,
        search
    }
}