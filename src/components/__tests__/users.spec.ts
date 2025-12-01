import { beforeEach, expect, test, describe, vi, type VitestUtils, type Mock } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import axios from 'axios'

vi.mock('axios')

describe('Users Component', () => {
    let component: VueWrapper

    beforeEach(async () => {
        (axios.get as Mock).mockResolvedValue({
            data: [
                {
                    id: 1,
                    name: 'sasasa',
                    email: 'dzde@aaa.net'
                }
            ]
        })
    
        component = mount(Users)

        await flushPromises()
    })

    test('Liste affiche bien', () => {
        const elements = component.findAll('article')
        expect(elements.length).toBeGreaterThan(0)
    })
})