<template>
    <article
        :class="[
            'relative', 'article'
        ]"
        
    >
        <slot />
    </article>
</template>



<style scoped>
    .article {
        @apply w-full px-4 md:px-0 md:w-3/4 mx-auto;
    }
</style>
