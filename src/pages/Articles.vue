<template>
    <h1>Articles</h1>

    <TransitionGroup name="fade" mode="out-in">
        <Suspense v-for="article in articles" :key="article.id">
            <template #default>
                <AsyncArticleDetail :article>
                    <template #header="{ active }">
                        <h1>sazdz</h1>
                        <p>Est actif: {{ active }}</p>
                    </template>
                    <template #default>
                        <h2>footer</h2>
                    </template>
                </AsyncArticleDetail>
            </template>
            <template #fallback>
                <p>Loading article detail</p>
            </template>
        </Suspense>
    </TransitionGroup>
</template>

<script setup lang="ts">
import axios from 'axios';
import { defineAsyncComponent, onMounted, ref, TransitionGroup } from 'vue';
import type { Article } from '../types/article';
import ErrorComponent from '../components/ErrorComponent.vue';

const AsyncArticleDetail = defineAsyncComponent({
    loader: () => import('../components/ArticleDetail.vue'),
    delay: 2000,
    timeout: 1000,
    errorComponent: ErrorComponent,
    onError(error, retry, fail, attempts) {
        console.log(error)
    },
})

const articles = ref<Article[]>([])

onMounted(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    articles.value = res.data
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
 
</style>