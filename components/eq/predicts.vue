<template>
    <ul class="items grid text-typography_primary">
        <li class="item">
            <div class="wrapper">
                <header>
                    <h3 class="title" >
                        <NuxtLink :to=" '/f1' " class="hover:text-brand_primary">
                            M 7.8 Kaikōura Mon, Nov 14 2016
                        </NuxtLink>
                    </h3>
                    <p class="time">Published: 27 April 2023</p>
                </header>
                <div class="">
                    At 4.37 a.m., on the 2 September 2016, a magnitude 7.1 earthquake struck off 
                    the northern East Coast of North Island, 125 north-east of Te Araroa.
                </div>
            </div>
        </li>

        <li class="item">
            <div class="wrapper">
                <header>
                    <h3 class="title" >
                        <NuxtLink :to=" '/f1' " class="hover:text-brand_primary">
                            M 7.8 Kaikōura Mon, Nov 14 2016
                        </NuxtLink>
                    </h3>
                    <p class="time">Published: 27 April 2023</p>
                </header>
                <div class="">
                    At 4.37 a.m., on the 2 September 2016, a magnitude 7.1 earthquake struck off 
                    the northern East Coast of North Island, 125 north-east of Te Araroa.
                </div>
            </div>
        </li>
        
        <li class="item">
            <div class="wrapper">
                <header>
                    <h3 class="title" >
                        <NuxtLink :to=" '/f1' " class="hover:text-brand_primary">
                            M 7.8 Kaikōura Mon, Nov 14 2016
                        </NuxtLink>
                    </h3>
                    <p class="time">Published: 27 April 2023</p>
                </header>
                <div class="">
                    At 4.37 a.m., on the 2 September 2016, a magnitude 7.1 earthquake struck off 
                    the northern East Coast of North Island, 125 north-east of Te Araroa.
                </div>
            </div>
        </li>        

    </ul>
</template>


<script setup>
// Find the number of blogs present
const blogCountLimit = 6;
const { data } = await useAsyncData(`content-/blog`, async () => {
    const _posts = await queryContent('/blog').only('headline').find()
    return Math.ceil(_posts.length / blogCountLimit);
});
</script>


<style scoped>
    .items {
        display: flex;
        flex-direction: column;
        text-align: left;
        @apply w-full md:w-1/2;
    }

    .item {
        @apply mb-10 md:col-span-5 relative rounded-md border-0 border-typography_primary   ;
    }

    .title {
        @apply text-h4 leading-h3 font-semibold mb-2 ;
    }
    .time {
        @apply text-sm leading-sm mb-4 text-typography_primary/75 ;
    }
</style>
