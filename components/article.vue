<template>
    <article
        :class="[
            'relative'
        ]"
        :id="props.id"
    >
        <slot />
    </article>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'section'
    },
    fullHeight: {
        type: Boolean,
        required: false,
        default: false
    },
    forcedHeight: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<style scoped>
    article {
        @apply w-full px-4 md:px-0 md:w-3/4 mx-auto;
    }
</style>
