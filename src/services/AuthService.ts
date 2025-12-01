import axios from "axios"

export class AuthService {
    readonly url = 'https://apprendre.angular.fr/api/fake/login'
    token: string | null = null

    async login(email: string, password: string): Promise<void> {
        const res = await axios.post(this.url, {
            email,
            password
        })
        this.token = res.data.token
        console.log( this.token)
    }
}