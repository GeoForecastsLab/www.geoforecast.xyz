<template>
        <div class="table border-typography_primary w-1/2">
            <div class="table-header p-5 ">
                <div class="table-cell">Published</div>
                <div class="table-cell">Appx. Date</div>
                <div class="table-cell">Appx. Mag.</div>
                <div class="table-cell">Depth</div>
            </div>
            <div class="p-5 ">
                <div class="table-row" v-for="prediction in data" :key="prediction.id">
                    <div class="table-cell">2023, Nov</div>
                    <div class="table-cell"> <small>{{  prediction.date.from  }} - {{  prediction.date.to  }}</small></div>
                    <div class="table-cell"> {{  prediction.magnitude  }} </div>
                    <div class="table-cell"> <small>{{  prediction.depth[0]  }}</small> - <small>{{   prediction.depth[1]  }}</small></div>
                </div>
            </div>
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
    .table {
        @apply flex flex-col   overflow-hidden w-full bg-gray-100 rounded-lg;
    }

    .table-header {
        @apply grid grid-cols-4 text-gray-700 mb-4 border-b font-bold bg-gray-100;
    }

    .table-row {
        @apply grid grid-cols-4 mb-1;
    }
    
</style>
