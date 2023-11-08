<template>

    <div class="relative overflow-x-auto">
        <table class="table__eq w-full table-auto rounded-lg text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class=" hidden md:block">
                        Case
                    </th>
                    <th scope="col" class="w-10">
                        Appx. Magn.
                    </th>
                    <th scope="col" class="w-10">
                        Depth 
                    </th>
                    <th scope="col" class="">
                        Appx. Dates
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b " 
                v-for="article in data"
                :key="article.id"
                >
                    <td class=" hidden md:block">
                        <p class="text-sm">EQ-{{ article.id }}</p>
                        <p class="text-xs">published: nov, 2023</p>
                    </td>
                    <td >
                        {{ article.magnitude }}
                    </td>
                    <td >
                        {{ article.depth[0]  }} - {{  article.depth[1]   }} km
                    </td>
                    <td >
                        {{ article.date.from  }} .. {{  article.date.to   }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>


<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        default: "There are no posts right now, but stay tuned for newer releases in the future."
    }
});
</script>


<style scoped>
    .table__eq {
    }

    .table__eq td {
        @apply px-4 py-3 sm:px-6 lg:px-8 ;
    }
    
    .table__eq th {
        @apply px-4 py-3 sm:px-6 lg:px-8 ;
    }

</style>
