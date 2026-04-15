<template>
    <h1>login</h1>
     <FormRenderer :schema="loginFormSchema" @submitSuccess="onLogin">
        <button>Se connecter</button>
    </FormRenderer>
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

const loginFormSchema = {
  fields: [
    { name: "email", type: "text", label: "Adresse email", placeholder: "...", rules: "required|email" },
    { name: "password", type: "text", label: "Mot de passe", placeholder: "...", rules: "required|min:2" }
  ]
}

async function onLogin(data: any) {
    await submitAuth()
    router.push('/')
}
</script>