import axios from "axios"
import type { User } from "../types/user"

export type UserPayload = Omit<User, 'id'>

export class UsersService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'

    async getUsers(): Promise<User[]> {
        const res = await axios.get(this.url)
        return res.data
    }

    removeUser(id: number): Promise<void> {
        return axios.delete(this.url + '/' + id)
    }

    async createUser(payload: UserPayload): Promise<User> {
        const res = await axios.post(this.url, payload)
        return res.data
    }
}