import { describe, expect, test, vi } from "vitest";
import { useAuth, type AuthReturn } from "../useAuth";
import { mount} from "@vue/test-utils";
import { authToken } from "../../token";

describe('Tester useAuth', () => {
    let mockService: {
        login: ReturnType<typeof vi.fn>
    }
    let result: AuthReturn

    function mountComposable() {
        mockService = {
            login: vi.fn().mockResolvedValue('test-token')
        }

        mount({
            template: '<div />',
            setup() {
                 result = useAuth()
            }
        }, {
            global: {
                provide: {
                    [authToken]: mockService
                }
            }
        })

        return result
    }

    test('Tester appel login et token', async () => {
       const { email, password, token, submitAuth } = mountComposable()
       email.value = 'test@test.com'
       password.value = 'test'
       await submitAuth()
       expect(mockService.login).toHaveBeenCalledWith(email.value, password.value)
       expect(token.value).toBe('test-token')
    })
})