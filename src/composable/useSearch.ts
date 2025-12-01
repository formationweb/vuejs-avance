import { computed, type Ref } from "vue";
import type { User } from "../types/user";

export function useSearch(users: Ref<User[]>, search: Ref<string>) {
    const usersFiltered = computed(() => {
        return users.value.filter(user => user.name.includes(search.value))
    })
    return {
        usersFiltered
    }
}