<template>
    <footer class="pt-2 mb-5 pb-2 border-typography_primary mx-4 ">
        <ul class="text-sm md:text-base font-medium flex mt-4 justify-between w-full md:w-1/2">
            <li>
                <a href="#" class="menu_item_a ">About </a>
            </li>
            <li>
                <a href="#" class="menu_item_a ">Contact</a>
            </li>
            <li>
                <a href="#" class="menu_item_a ">Disclaimer</a>
            </li>
            <li>
                <a href="#" class="menu_item_a ">Privacy</a>
            </li>
            <li>
                <a href="#" class="menu_item_a ">Terms</a>
            </li>
        </ul>
    </footer>
</template>

<style scoped>
    footer {
        @apply border-typography_primary mx-0 pt-2 mb-5 pb-2  md:mx-4;
    }
    .menu_item_a {
        @apply block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ;
    }
</style>
