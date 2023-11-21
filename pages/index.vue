<template>
    <LayoutMain>
        <Article id="data" class="!pt-0" :full-width="true">
            <EqList :data="result" />
        </Article>
    </LayoutMain>
</template>

<script setup>
    const { data: {value: { result }} } = await useFetch(`/api/preds`);
</script>