<template>
     <article>
        <header>{{  user.name }}</header>
        <p>{{ user.email }}</p>
        <button 
            v-tooltip="'Supprimer'"
            v-confirm="{
                message: 'Etes vous ...',
                onConfirm: () => emits('onDelete', user.id)
            }">

            Supprimer
        </button>
        <slot slot="footer" :user></slot>
    </article>
</template>

<script setup lang="ts">
import type { User } from '../types/user';

defineProps<{
    user: User
}>()

const emits = defineEmits<{
    onDelete: [number]
}>()
</script>