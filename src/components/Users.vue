<template>
    <article v-for="user in users" :key="user.id">
        <header>{{ user.name }}</header>
        <p>{{ user.email }}</p>
    </article>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const users = ref<any>([])

fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => users.value = data)
</script>