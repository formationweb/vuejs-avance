import { beforeEach, describe, expect, test, vi } from "vitest";
import { useUserFetch } from "../useUserFetch";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import { usersServiceToken } from "../../token";
import type { Ref } from "vue";
import type { User } from "../../types/user";
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from "../../stores/user";

describe('Tester useUserFetch', () => {
    let mockService: {
        getAll: ReturnType<typeof vi.fn>
    }
    let result: { users: Ref<User[]>, getAll: () => Promise<User[]> }
   // let store

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
               // store = useUserStore()
            }
        }, {
            global: {
                provide: {
                    [usersServiceToken]: mockService
                },
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false
                })]
            }
        })

        return result
    }

    test('Vérifier les users', async () => {
       const { users, getAll } = mountComposable()
       await getAll()
       await flushPromises()
       expect(users.value.length).toBeGreaterThan(0)
      // expect(store.setUsers).toHaveBeenCalled()
    })
})