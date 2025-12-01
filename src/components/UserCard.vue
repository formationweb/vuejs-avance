<template>
     <article>
        <header>{{  user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>

<script setup lang="ts">
import type { User } from '../types/user';

defineProps<{
    user: User
}>()
</script>