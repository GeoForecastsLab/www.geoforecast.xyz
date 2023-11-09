<template>
    <section class="relative flex overflow-x-auto flex-col	">
        <div
            v-for="article in data"
            :key="article.id"
            class="card  "
        >

        <div>
            <EqPred class="media" :prediction="article"></EqPred>
        </div>

        <div class="body">
                <div class="body_title">
                    <h4>EQ-{{ generateMnemonicID(article) }}, M{{ article.magnitude }} </h4>
                </div>
                <div class="body_content">
                    <p>
                        <strong>When:</strong> between approx. {{ formatDate(article.date.from) }} and {{ formatDate(article.date.to) }}
                    </p>
                    <p>
                        <strong>Approximate magnitude:</strong> around {{ article.magnitude }}
                    </p>
                    <p>
                        <strong>Depth:</strong> ranging from {{ article.depth[0] }} to {{ article.depth[1] }} kilometers.
                    </p>
                    <p>
                        <strong>Location:</strong> ranging 100 km around ({{ article.point.lat }}, {{ article.point.long }})
                    </p>
                </div>

                <div class="body_footer ">
                    <div class="flex items-center">
                        <IconsDate/><p>1st Mar 2023</p>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap">
                        <IconsTags />
                        <p>algorithm=v0.1</p><p>vercel</p>
                    </div>
                </div>
        </div>


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
        default: "There are no posts right now, but stay tuned for newer releases in the future."
    }
});

// Function to generate a mnemonic ID
const generateMnemonicID = function(prediction) {
  const dateParts = prediction.date.from.split('-');
  const year = dateParts[0].substring(2);
  const month = dateParts[1];
  const day = dateParts[2];
  return `${year}${month}${day}`;
}

function formatDate(time) {
    const date = new Date(time);    
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.toLocaleString("default", { day: "numeric" });
    return `${month} ${day}, ${year}`;
}

</script>

<style scoped>
    .card {
        @apply mb-4 pb-3 border-b  flex flex-nowrap w-full ;
    }

    .media {
        @apply my-auto mx-5 ;
    }

    .body {
        @apply sm:col-span-7 p-5 ;
    }
    .body_title {
        @apply mb-2 ;
    }
    .body_content {
        @apply mb-2 ;
    }

    .body_footer {
        @apply text-black mt-4 mb-1 md:flex md:space-x-6 ;
    }
    .body_footer p {
        @apply text-sm;
    }
</style>