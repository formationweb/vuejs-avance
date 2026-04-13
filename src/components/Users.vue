<template>
    <h1>{{  title }}</h1>

    <Opacity color="black" :opacity="1" @change="console.log" />

    <input type="text" placeholder="Rechercher" v-model="search" @change="emits('onSearch', search)">

    <div v-if="!loading">
        <UserCard  v-for="user in users" :key="user.id" :user="user" />
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserFetch } from '../composables/useUserFetch';
import UserCard from './UserCard.vue';
import Opacity from '../atomics/Opacity.vue';

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