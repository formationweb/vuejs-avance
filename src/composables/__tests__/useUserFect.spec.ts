import { beforeEach, describe, expect, test, vi } from "vitest";
import { useUserFetch } from "../useUserFetch";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { usersServiceToken } from "../../token";
import type { Ref } from "vue";
import type { User } from "../../types/user";

describe('Tester useUserFetch', () => {
    let mockService: {
        getAll: ReturnType<typeof vi.fn>
    }
    let result: { users: Ref<User[]>, getAll: () => Promise<User[]> }

    function mountComposable() {
        mockService = {
            getAll: vi.fn().mockResolvedValue([
                {
                    id: 1,
                    name: 'ana',
                    email: 'ana@daddad.net'
                }
            ])
        }

        mount({
            template: '<div />',
            setup() {
                 result = useUserFetch()
            }
        }, {
            global: {
                provide: {
                    [usersServiceToken]: mockService
                }
            }
        })

        return result
    }

    test('Vérifier article', async () => {
       const { users, getAll } = mountComposable()
       await getAll()
       await flushPromises()
       expect(users.value.length).toBeGreaterThan(0)
    })
})