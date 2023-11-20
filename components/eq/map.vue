<template>
    <section class="hidden md:block map_wrapper ">
        <LMap
            ref="map"
            :zoom="zoom"
            :center="[47.21322, -1.559482]"
            class="mx-auto"
            >

            <LTileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
                layer-type="base"
                name="OpenStreetMap"
            />
            </LMap>
    </section>
</template>

<script setup>
    import { ref } from 'vue'
    const zoom = ref(6);

</script>

<style scoped>
    .map_wrapper {
        margin: 0 auto;
        @apply w-[60vh] h-[60vh] xl:w-[88vh] xl:h-[88vh];
    }

</style>