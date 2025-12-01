import { beforeEach, expect, test, describe, vi, type VitestUtils, type Mock } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useSearch } from '../../composable/useSearch'
import type { User } from '../../types/user'

vi.mock('axios')

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

    beforeEach(async () => {
        (axios.get as Mock).mockResolvedValue({
            data: mockUsers
        })
    
        component = mount(Users)

        await flushPromises()
    })

    test('Liste affiche bien', () => {
        const elements = component.findAll('article')
        expect(elements.length).toBeGreaterThan(0)
    })

    test('Tester useSearch', () => {
        const users = ref(mockUsers)
        const search = ref('ana')
        const { usersFiltered } = useSearch(users, search)
        expect(usersFiltered.value).toHaveLength(1)
        expect(usersFiltered.value[0]).toHaveProperty('id', 1)
    })
})