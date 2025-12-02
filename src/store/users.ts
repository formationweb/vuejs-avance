import { defineStore } from "pinia";
import type { User } from "../types/user";
import { inject, ref } from "vue";
import type { UserPayload, UsersService } from "../services/UsersService";


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

    const createUser = async (payload: UserPayload) => {
        const user = await usersService?.createUser(payload) as User
        users.value = [
            ...users.value,
            user
        ]
    }

    return  {
        users,
        getUsers,
        deleteUser,
        createUser
    }
})