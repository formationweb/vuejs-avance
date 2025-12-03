import type { Directive, DirectiveBinding } from "vue"

type InputBinding = {
    message: string
    onConfirm: () => void
}

interface ConfirmButton extends HTMLElement {
    __callback: () => void
}

export const confirmDirective: Directive<ConfirmButton, InputBinding> = {
    mounted(btn, binding) {
        btn.__callback = () => {
            const { message, onConfirm } = binding.value
            const bool = window.confirm(message)
            if (bool) {
                onConfirm()
            }
        }
        btn.addEventListener('click', btn.__callback)
    },
    beforeUnmount(btn) {
        btn.removeEventListener('click', btn.__callback)
    }
}