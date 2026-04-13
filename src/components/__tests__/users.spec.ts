import { beforeEach, describe, expect, test, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import { UsersService } from '../../services/users'
import { usersServiceToken } from '../../token'

// class MockUsersService {
//     async getAll() {
    //     return [
    //         {
    //             id: 1,
    //             name: 'ana',
    //             email: 'ana@daddad.net'
    //         }
    //     ]
    // }
// }

describe('Users Component', () => {
    let component: VueWrapper
    let mockService: {
        getAll: ReturnType<typeof vi.fn>
    }

    beforeEach(async () => {

        mockService = {
            getAll: vi.fn().mockResolvedValue([
                {
                    id: 1,
                    name: 'ana',
                    email: 'ana@daddad.net'
                }
            ])
        }

        component = mount(Users, {
            global: {
                provide: {
                    [usersServiceToken]: mockService
                }
            }
        })

        await flushPromises()
    })

    test('Vérifier article', () => {
        const elements = component.findAll('article')
        expect(elements.length).toBeGreaterThan(0)
    })
})

