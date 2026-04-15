import type { ObjectDirective } from "vue";

interface TooltipElement extends HTMLElement {
    __tooltip: {
        element: HTMLElement
        visible: boolean
    }
}

export const tooltip: ObjectDirective<TooltipElement, string> = {
    mounted(el, binding) {
        const tooltip = document.createElement('div')
        tooltip.style.position = 'absolute'
        tooltip.textContent = binding.value

        el.__tooltip = {
            element: tooltip,
            visible: false
        }

        el.addEventListener('mouseenter', () => {
            if (tooltip) {
                const rect = el.getBoundingClientRect()
                tooltip.style.left = `${rect.left}px`
                tooltip.style.top = `${rect.top}px`
                 tooltip.style.opacity = '1'
                  el.__tooltip.visible = true
            }
        })

        el.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0'
                el.__tooltip.visible = false
            }
        })

        document.body.appendChild(tooltip)
    },
    updated(el, binding) {
        const tooltip = el.__tooltip.element
        if (tooltip) {
            tooltip.textContent = binding.value
        }
    },
    unmounted(el) {
        document.body.removeChild(el.__tooltip.element)
    }
}