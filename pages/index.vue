<template>
    <LayoutMain>
        <Article id="data" class="!pt-0" :full-width="true">
            <EqList :data="result" />
        </Article>
    </LayoutMain>
</template>

<script setup>
const response = await useFetch(`/api/preds`);
const result = response?.data?.value?.result ?? null;
</script>