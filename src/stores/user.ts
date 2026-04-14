import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";

export const useUserStore = defineStore('user', () => {
    // state
     const users = ref<User[]>([])

    // action
    function setUsers(val: User[]) {
        users.value = val
    }

    return {
        users,
        setUsers
    }
})