import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, test, beforeEach } from "vitest";
import Opacity from "../Opacity.vue";

describe('User Component', () => {
    let component: VueWrapper

    beforeEach(() => {
        component = mount(Opacity, {
            props: {
                color: 'black',
                opacity: 0.5
            }
        })
    })

    test('Vérifier opacité impact sur input et la div', () => {
        const input = component.find<HTMLInputElement>('#opacity')
        const div = component.find<HTMLDivElement>('#preview')
        expect(input.element.value).toBe('0.5')
        expect(div.element.style.opacity).toBe('0.5')
    })

    test('Vérifier modifie input, émet opacity', async () => {
         const input = component.find<HTMLInputElement>('#opacity')
         input.setValue('0.2')
         await input.trigger('change')
         expect(component.emitted('change')?.[1]).toEqual(['0.2'])
    })
})