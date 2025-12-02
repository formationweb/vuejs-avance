import { defineStore } from "pinia";
import type { User } from "../types/user";
import { inject, ref } from "vue";
import type { UsersService } from "../services/UsersService";

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const usersService = inject<UsersService>('usersService')

    const getUsers = async () => {
        const usersList = await usersService?.getUsers()
        users.value = usersList ?? []
    }

    const deleteUser = async (id: number) => {
        await usersService?.removeUser(id)
        users.value = users.value.filter(user => user.id != id)
    }

    return  {
        users,
        getUsers,
        deleteUser
    }
})