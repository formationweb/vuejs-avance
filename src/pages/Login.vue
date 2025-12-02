<template>
    <form @submit.prevent="onLogin">
        <label>Email</label>
        <input type="text" v-model="email" name="email">

        <label>Password</label>
        <input type="password" v-model="password" name="password">

        <button>Se connecter</button>
    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composable/useAuth';

const router = useRouter()

const { email, password, submitAuth } = useAuth()

async function onLogin() {
    await submitAuth()
    router.push({ name: 'home' })
}
</script>