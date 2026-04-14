<template>
    <h1>login</h1>
    <form @submit.prevent="onLogin">
        <label>Email</label>
        <input type="text" name="email" v-model="email" />

         <label>Mot de passe</label>
        <input type="password" name="password" v-model="password" />

        <button>Se connecter</button>
    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter()
// const authStore = useAuthStore()
// const { token } = storeToRefs(authStore)
const { email, password, submitAuth } = useAuth()

async function onLogin() {
    await submitAuth()
    router.push('/')
}
</script>