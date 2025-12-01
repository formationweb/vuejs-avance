import axios from "axios"
import type { User } from "../types/user"

export class UsersService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'

    async getUsers(): Promise<User[]> {
        const res = await axios.get(this.url)
        return res.data
    }
}