import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";
import UserCard from "../UserCard.vue";
import type { User } from "../../types/user";

describe('Tester UserCard', () => {
    let component: VueWrapper

    const mockUser: User = {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
    }

    beforeEach(() => {
        component = mount(UserCard, {
            props: {
                user: mockUser
            }
        })
    })

    test('vérifier que les données de l\'utilisateur sont identiques au infos dans le template', () => {
        expect(component.text()).toContain(mockUser.name)
        expect(component.text()).toContain(mockUser.email)
    })
})