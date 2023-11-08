<template>
    <LayoutMain>
        <Article id="data" class="!pt-0">
            <EqList :data="data" />
        </Article>
    </LayoutMain>
</template>

<script setup>

const { data } = await useAsyncData(`content-/blog`, async () => {
    const _predictions = await queryContent('preds').find()
    return _predictions[0].body.map((it,index) => { return {...it, id: generateMnemonicID(it, index)}; });
});

// Function to generate a mnemonic ID
function generateMnemonicID(prediction, index) {
  const dateParts = prediction.date.from.split('-');
  // Extract relevant parts from the prediction
  const year = dateParts[0].substring(2);
  const month = dateParts[1];
  const day = dateParts[2];
  // Combine the parts to create the mnemonic ID
  const mnemonicID = `${year}${month}${day}-${index}`;

  return mnemonicID;
}


</script>