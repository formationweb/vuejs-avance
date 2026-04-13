import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, test, beforeEach } from "vitest";
import UserCard from "../UserCard.vue";

describe('User Component', () => {
    let component: VueWrapper

    beforeEach(() => {
        component = mount(UserCard, {
            props: {
                user: {
                    id: 1,
                    name: 'ana',
                    email: 'aaa@aa.net'
                } as any
            }
        })
    })

    test('Props identiques dans le tpl', () => {
        expect(component.text()).toContain('ana')
        expect(component.text()).toContain('aaa@aa.net')
    })
})