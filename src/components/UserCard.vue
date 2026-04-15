<template>
    <article>
        <slot name="header"></slot>
        <header>{{ user.name }}</header>
        <p>{{ user.email }}</p>
        <input type="checkbox" v-model="active">
        <slot :active :user></slot>
        <button v-confirm="() => ...">Supprimer</button>
    </article>
    <hr>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../types/user';

const active = ref(false)

defineProps<{
    user: User
}>()
</script>