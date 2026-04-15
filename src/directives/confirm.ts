import type { ObjectDirective } from "vue";

interface ConfirmElement extends HTMLButtonElement {
    __callback: () => void
}

export const confirm: ObjectDirective<ConfirmElement, () => void> = {
    mounted(btn, binding) {
        btn.__callback = () => {
            const onConfirm = binding.value
            const bool = window.confirm('Etes vous sur ...')
            if (bool) {
                onConfirm()
            }
        }
        btn.addEventListener('click', btn.__callback)
    },
    unmounted(btn) {
        btn.removeEventListener('click', btn.__callback)
    },
}