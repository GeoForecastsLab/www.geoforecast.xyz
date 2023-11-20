<template>
    <component :is="props.type"
        :class="[
            'sectioned_x py-8 relative',
            props.fullHeight ? 'full-height' : '',
            props.forcedHeight ? 'full-height--forced' : ''
        ]"
        :id="props.id"
    >
        <slot />
    </component>
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

.full-height.full-height--forced {
    height: calc(100vh - theme('spacing.nav'));
}

@screen md {
    .full-height:not(.full-height--forced) {
        height: calc(100vh - theme('spacing.nav'));
    }
}

.sectioned_x {
    @apply w-full md:w-[46rem] mx-auto px-4 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl;
}

</style>
