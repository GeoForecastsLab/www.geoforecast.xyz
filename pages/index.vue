<template>
    <center>
        
        <NavHeader />

        <Section id="data" class="!pt-0">
            <EqPredicts />
        </Section>

        <Section id="footer" class="!pt-0">
            <NavFooter />
        </Section>
        
    </center>
</template>

<script setup>
// Find the number of blogs present
const blogCountLimit = 6;
const { data } = await useAsyncData(`content-/blog`, async () => {
    const _predictions = await queryContent('preds').find()
    return _predictions;
});
</script>