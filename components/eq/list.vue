<template>
    <div class="relative overflow-x-auto border-">
        <div
            v-for="article in data"
            :key="article.id"
            class="mb-4 pb-3 border-b flex flex-nowrap w-full  md:w-1/2 "
        >

        <EqPred class="my-auto mx-5" ></EqPred>

        <div>
                <div class="mb-2">
                    <h5>EQ-{{ generateMnemonicID(article) }}</h5>
                    <small>Published: Nov, 2023</small>
                </div>
                <div class="row">
                    <p>Date: approx. {{ article.date.from }} - {{ article.date.to }}</p>
                    <p>Magnitude: {{ article.magnitude }}</p>
                    <p>Depth: approx. {{ article.depth[0] }} - {{ article.depth[1] }} km</p>
                </div>
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

// Function to generate a mnemonic ID
const generateMnemonicID = function(prediction) {
  const dateParts = prediction.date.from.split('-');
  const year = dateParts[0].substring(2);
  const month = dateParts[1];
  const day = dateParts[2];

  const mnemonicID = `${year}${month}${day}`;
  return mnemonicID;
}

</script>

<style scoped>
    .row {
        @apply mb-2 ;
    }
</style>