<template>
    <section class="hidden md:block map_wrapper ">
        <LMap
            ref="map"
            :zoom="zoom"
            :center="latLng()"
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

    const props = defineProps({
        centered: {
            type: Object
        }
    });

    function latLng() {
        if (props.centered) {
            const {lat,long} = props?.centered?.point;
            return [lat, long]
        }
        return []
    }
</script>

<style scoped>
    .map_wrapper {
        margin: 0 auto;
        @apply w-[60vh] h-[60vh] md:w-[55vh] md:h-[55vh] xl:w-[85vh] xl:h-[85vh] ;
    }

</style>