<template>
    <header class="pt-2 mb-5 pb-5 border-typography_primary   ">
        <nav class="py-2 mx-4 md:mx-10 md:mx-10">
            <div class=" flex flex-wrap items-center justify-between mx-auto px-4">
                
                <div>
                    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.png" class="h-8" alt="geoforecast logo" />
                        <span class=" self-center text-3xl font-semibold whitespace-nowrap ">geoforecast</span>
                    </a>
                </div>

                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="text-2xl font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                        <li>
                            <a href="#" class="menu_item_a ">About </a>
                        </li>
                        <li>
                            <NuxtLink to="/content/contact" class="menu_item_a" >Contact</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/content/disclaimer" class="menu_item_a" >Disclaimer</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/content/terms" class="menu_item_a" >Terms</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class=" border-t-2 mt-3 border-gray-200 flex flex-col md:flex-row items-center md:justify-between md:text-right"></div>
    </header>
</template>

<style scoped>
    .menu_item_a {
        @apply block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ;
    }
</style>
