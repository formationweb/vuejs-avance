import { describe, expect, test, vi } from "vitest";
import { useAuth, type AuthReturn } from "../useAuth";
import { mount} from "@vue/test-utils";
import { authToken } from "../../token";
import { createTestingPinia } from "@pinia/testing";

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
                },
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false
                })]
            }
        })

        return result
    }

    test('Tester appel login', async () => {
       const { email, password, submitAuth } = mountComposable()
       email.value = 'test@test.com'
       password.value = 'test'
       await submitAuth()
       expect(mockService.login).toHaveBeenCalledWith(email.value, password.value)
    })
})