import { beforeEach, expect, test, describe, vi, type VitestUtils, type Mock, afterEach } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useSearch } from '../../composable/useSearch'
import type { User } from '../../types/user'
import UserCard from '../UserCard.vue'
import { UsersService } from '../../services/UsersService'

//vi.mock('axios')

const mockUsers: User[] = [
    {
        id: 1,
        name: 'ana',
        email: 'dzde@aaa.net'
    },
    {
        id: 2,
        name: 'ben',
        email: 'aa@aa.net'
    }
]

describe('Users Component', () => {
    let component: VueWrapper
    let mockService: Mock

    beforeEach(async () => {
        // (axios.get as Mock).mockResolvedValue({
        //     data: mockUsers
        // })

        mockService = {
            getUsers: vi.fn().mockResolvedValue(mockUsers)
        } as any
    
        component = mount(Users, {
            props: {
                title: 'hello world'
            },
            global: {
                provide: {
                    usersService: mockService
                }
            }
        })

        await flushPromises()
    })

    afterEach(() => {
        mockService.getUsers.mockReset()
    })

    test('Liste affiche bien', () => {
        const elements = component.findAllComponents(UserCard)
        expect(elements.length).toBeGreaterThan(0)
    })

    test('Tester useSearch', () => {
        const users = ref(mockUsers)
        const { usersFiltered, search } = useSearch(users)
        search.value = 'ana'
        expect(usersFiltered.value).toHaveLength(1)
        expect(usersFiltered.value[0]).toHaveProperty('id', 1)
    })

    test('tester barre de recherche', async () => {
        const input = component.find('input')
        input.setValue('ana')
        await input.trigger('change')
        const elements = component.findAllComponents(UserCard)
        expect(elements).toHaveLength(1)
    })
})