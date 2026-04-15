<template>
    <h1>Articles</h1>
    <TransitionGroup name="fade">
        <div v-for="article of articles" :key="article.id">
            <Suspense>
                <template #default>
                    <AsyncArticleDetail :article />
                </template>
                <template #fallback>
                    <p>Loading article detail</p>
                </template>
            </Suspense>
        </div>
    </TransitionGroup>
    
</template>

<script lang="ts" setup>
import axios from 'axios';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import ErrorComponent from '../components/ErrorComponent.vue';

const AsyncArticleDetail = defineAsyncComponent({
    loader: () => import('../components/ArticleDetail.vue'),
    errorComponent: ErrorComponent,
    onError(err, retry, fail, attempts) {
       if (attempts <= 3) {
            retry()
       }
       else {
            fail()
       }
    }
})

const articles = ref<any[]>([])

onMounted(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    articles.value = res.data
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>