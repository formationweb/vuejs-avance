<template>
    <h1>{{  title }}</h1>

    <input type="text" placeholder="Rechercher" v-model="search" @change="emits('onSearch', search)">

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
import { onMounted, ref } from 'vue';
import { useUserFetch } from '../composables/useUserFetch';

const search = ref('')

defineProps<{
    title: string
}>()

const emits = defineEmits<{
    onSearch: [string]
}>()

const { users, getAll, loading } = useUserFetch()

getAll()
</script>