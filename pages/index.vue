<template>
    <LayoutMain>
        <Article id="data" class="!pt-0">
            <EqPredicts :data="data" />
        </Article>
    </LayoutMain>
</template>

<script setup>
  const crypto = require('crypto');

const { data } = await useAsyncData(`content-/blog`, async () => {
    const _predictions = await queryContent('preds').find()
    return _predictions[0].body.map((it,index) => { return {...it, id: generateMnemonicID(it)}; });
});

// Function to generate a mnemonic ID
function generateMnemonicID(prediction) {
  const dateParts = prediction.date.from.split('-');

  // Extract relevant parts from the prediction
  const year = dateParts[0].substring(2);
  const month = dateParts[1];
  const day = dateParts[2];
  
  const suf = calculateHash(`${prediction.desc}-${prediction.date.from}-${prediction.date.to}`);

  // Combine the parts to create the mnemonic ID
  const mnemonicID = `${year}${month}${day}-${suf}`;
  
  return mnemonicID;
}

function calculateHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').substring(0, 7).toUpperCase();
}


</script>