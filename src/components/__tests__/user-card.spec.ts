import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import UserCard from "../UserCard.vue";
import type { User } from "../../types/user";
import { h } from "vue";

describe('Tester UserCard', () => {
    let component: VueWrapper

    const mockUser: User = {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
    }

    const spy = vi.fn(({ user }) => h('div', `${user.name}`))

    beforeEach(() => {
        component = mount(UserCard, {
            props: {
                user: mockUser
            },
            slots: {
                default: `
                    <template>
                        <p>test</p>
                    </template>
                `,
                footer: spy
            }
        })
    })

    test('vérifier que les données de l\'utilisateur sont identiques au infos dans le template', () => {
        expect(component.text()).toContain(mockUser.name)
        expect(component.text()).toContain(mockUser.email)
    })

    test('test slot', () => {
        expect(spy).toHaveBeenCalled()
    })
})