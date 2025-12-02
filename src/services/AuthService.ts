import axios from "axios"

export const KEY_TOKEN = 'token'

export class AuthService {
    readonly url = 'https://apprendre.angular.fr/api/fake/login'

    async login(email: string, password: string): Promise<string> {
        const res = await axios.post(this.url, {
            email,
            password
        })
        localStorage.setItem(KEY_TOKEN, res.data.token)
        return res.data.token
    }
}