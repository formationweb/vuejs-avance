import axios from "axios"
import type { User } from "../types/user"

export class UsersService {
    readonly url = (import.meta.env.API_URL ?? 'https://jsonplaceholder.typicode.com') + '/users'

    async getAll(): Promise<User[]> {
        const res = await axios.get(this.url)
        return res.data
    }

    async delete(id: number): Promise<void> {
         await axios.delete(this.url + '/' + id)
    }
}