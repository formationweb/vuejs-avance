import { computed, ref, type Ref } from "vue";
import type { User } from "../types/user";

export function useSearch(users: Ref<User[]>) {
    const search = ref('')
    const usersFiltered = computed(() => {
        return users.value.filter(user => user.name.includes(search.value))
    })
    return {
        usersFiltered,
        search
    }
}