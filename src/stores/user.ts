import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../types/user";

export const useUserStore = defineStore('user', () => {
    // state
     const users = ref<User[]>([])
     const nameSearch = ref('')

     // getter
     const usersFiltered = computed(() => {
        if (!nameSearch.value) {
            return users.value
        }
        return users.value.filter(user => user.name.startsWith(nameSearch.value))
     })

    // action
    function setUsers(val: User[]) {
        users.value = val
    }

    function deleteUser(id: number) {
        users.value = users.value.filter(user => user.id != id)
    }

    function setNameSearch(val: string) {
        nameSearch.value = val
    }

    return {
        users,
        usersFiltered,
        nameSearch,
        setUsers,
        setNameSearch,
        deleteUser
    }
})