import axios from "axios";

export class AuthService {
    readonly url = 'https://apprendre.angular.fr/api/fake/login'

    async login(email: string, password: string): Promise<string> {
        const res = await axios.post(this.url, {
            email,
            password
        })
        return res.data.token
    }
}