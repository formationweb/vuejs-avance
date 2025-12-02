import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi, type Mock } from "vitest";
import Login from '../Login.vue'
import axios from "axios";
import { AuthService } from "../../services/AuthService";

vi.mock('axios')

describe('Login Spec', () => {
    let component: VueWrapper

    beforeEach(() => {
        (axios.post as Mock).mockResolvedValue({
            data: {
                token: 'test'
            }
        })
        component = mount(Login, {
            global: {
                provide: {
                    authService: new AuthService()
                } 
            }
        })
    })

    test('Vérifier que est soumission est ok', async () => {
        await component.find('input[name="email"]').setValue('test@test.com')
        await component.find('input[name="password"]').setValue('test@test.com')
        await component.find('form').trigger('submit.prevent')
        expect(axios.post).toHaveBeenCalled()
    })
})