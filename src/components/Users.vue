<template>
    <div v-if="!loading">
        <article v-for="user in users" :key="user.id">
            <header>{{ user.name }}</header>
            <p>{{ user.email }}</p>
        </article>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserFetch } from '../composables/useUserFetch';

const { users, getAll, loading } = useUserFetch()

getAll()
</script>