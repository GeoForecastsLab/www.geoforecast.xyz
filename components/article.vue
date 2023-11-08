<template>
    <article
        :class="[
            'relative',
            props.fullHeight ? 'full-height' : '',
            props.forcedHeight ? 'full-height--forced' : ''
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
        @apply w-full md:w-1/2;
    }
</style>
