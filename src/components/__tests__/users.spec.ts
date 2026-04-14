import { beforeEach, describe, expect, test, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import { UsersService } from '../../services/users'
import { usersServiceToken } from '../../token'
import UserCard from '../UserCard.vue'
import { createTestingPinia } from '@pinia/testing'

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
                },
                plugins: [createTestingPinia({
                    createSpy: vi.fn,
                    stubActions: false
                })]
            },
            props: {
                title: 'Test'
            }
        })

        await flushPromises()
    })

    test('Vérifier article', () => {
        const elements = component.findAllComponents(UserCard)
        expect(elements.length).toBeGreaterThan(0)
    })

    test('vérifier le titre', () => {
        expect(component.text()).toContain('Test')
    })

    test('Tester search', async () => {
        const input = component.find<HTMLInputElement>('#search')
        //input.element.value
        input.setValue('ana')
        await input.trigger('change')
        expect(component.emitted('onSearch')?.[0]).toEqual(['ana'])
    })
})

