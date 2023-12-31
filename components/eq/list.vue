<template>
    <section class="relative flex flex-row justify-center	">
        <div class="cards" v-if="data">
            <div v-for="prediction in data" :key="prediction.id" class="card ">

                <div class="card_media">
                    <EqGlobView class="media_object" 
                        :prediction="prediction" 
                        @click="changeCenterPrediction(prediction)"/>
                </div>

                <div class="body">
                    <button class="body_title">
                        <h4 :class="[ isCenteredOnMap(prediction) ? 'focused' : '' ] "
                            @click="changeCenterPrediction(prediction)">{{ generateMnemonic(prediction) }} </h4>
                    </button>
                    <div class="body_header ">
                        <div class="flex items-center">
                            <IconsDate />
                            <p> {{ publishedTime(prediction) }} </p>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <IconsTags />
                            <p>Prediction Alg v1.0</p>
                            <!-- <p>Confirmed</p> -->
                        </div>
                    </div>

                    <div class="body_content">
                        <p>
                            <strong>When:</strong> between approx. <span class="body_code">{{ formatDate(prediction.date.from) }}</span> 
                            and <span class="body_code">{{ formatDate(prediction.date.to) }}</span>
                        </p>
                        <p>
                            <strong>Approximate magnitude:</strong> around {{ prediction.magnitude }}
                        </p>
                        <p>
                            <strong>Depth:</strong> ranging
                             from {{ prediction.depth[0] }} to {{ prediction.depth[1] }} kilometers.
                        </p>
                        <p>
                            <strong>Location:</strong> ranging 100 km around 
                            ({{ prediction.point.lat }}, {{ prediction.point.long }})
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards" v-else="data">
            <h5>{{ message }}</h5>
        </div>
        <div class="md:w-1/2">
            <EqMap :centered="centeredOnMap"/>
        </div>
    </section>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        default: "There are no predictions right now, but stay tuned for newer releases in the future."
    }
});

const centeredOnMap = ref(
    props.data?.length > 0 ? props.data[0] : undefined
);

function isCenteredOnMap(prediciton) {
    return centeredOnMap.value.id === prediciton.id
}

function changeCenterPrediction(prediction) {
    if (prediction) {
        centeredOnMap.value = prediction;
    }
}

const generateMnemonic = function (prediction) {
    const prefix = prediction?.geoid || '';
    return `EQ-${prefix} near ${prediction.desc}`;
}

function formatDate(time) {
    const date = new Date(time);
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.toLocaleString("default", { day: "numeric" });
    return `${month} ${day}, ${year}`;
}

function publishedTime(prediction) {
    const ts = prediction?._ts;
    if (ts !== undefined) {
        const date = new Date(ts * 1000); // Convert to milliseconds
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;        
    }
}

</script>

<style scoped>

.cards {
    @apply w-full h-[100vh] md:w-1/2 xl:w-2/5 overflow-auto;
}

.card {
    @apply mb-4 pb-3 border-b flex flex-nowrap w-full flex-col md:flex-row;
}

/* .card:after {
  content: '';
  position: absolute;
  left: 0px;
  right: 0px;
  height: 17%;
  bottom: 0px;
  background: linear-gradient(180deg, rgba(139,167,32,0) 0%, rgb(255, 255, 255) 100%);
  pointer-events: none;
} */

.card_media {
    @apply flex flex-wrap content-center justify-center;
}

.media_object {
    @apply cursor-pointer ;
}

.body {
    @apply sm:col-span-7 p-5;
}

.body_title {
    @apply my-0 text-brand_primary;
}

.body_title h4 {
    @apply text-brand_primary border-b-2 border-white hover:border-solid hover:border-b-2 hover:border-brand_primary;
}

.body_title h4.focused {
    @apply border-solid border-b-2 border-brand_primary;
}

.body_content {
    @apply mb-2;
}

.body_header {
    @apply text-black mt-2 mb-3 md:flex md:space-x-6;
}

.body_code {
    font-weight: 500
}

.body_footer p {
    @apply text-sm my-0;
}</style>