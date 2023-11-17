<template>
    <div class="relative flex main">
        <NavHeader class="nav"/>
        <slot />
        <NavFooter class="footer"/>
    </div>
</template>

<style scoped>
    .main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .footer {
        margin-top: auto;
    }
</style>

