<template>
    <article>
        <slot name="header"></slot>
        <header>{{ user.name }}</header>
        <p>{{ user.email }}</p>
        <slot></slot>
    </article>
    <hr>
</template>

<script setup lang="ts">
import type { User } from '../types/user';

defineProps<{
    user: User
}>()
</script>