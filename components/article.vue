<template>
    <article
        :class="[
            'relative', 
            fullWidth ? 'article-full' : 'article'
        ]"
        
    >
        <slot />
    </article>
</template>


<script setup>
const props = defineProps({
    fullWidth: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<style scoped>
    .article {
        @apply w-full px-4 md:px-0 md:w-3/4 mx-auto;
    }

    .article-full {
        @apply w-full mx-auto px-4 md:pl-10 md:pr-10;
    }
</style>
