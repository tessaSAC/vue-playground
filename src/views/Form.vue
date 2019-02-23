<script>
import RadioList from '../components/RadioList'
import VModelCustom from '../components/VModelCustom'
import VModelCustomOuro from '../components/VModelCustomOuro'

export default {
  components: {
    RadioList,
    VModelCustom,
    VModelCustomOuro,
  },

  data: _ => ({
    inputVModelCustom: '',
    inputVModelCustomOuro: '',
    radioSelected: '2',
  }),
}
</script>

<template>
  <div class="Form">
    <div class="inputs">
      <h3>Custom Input</h3>
      <VModelCustom v-model="inputVModelCustom" />
      <div class="output">
        <h3>Parent component input:</h3>
        <p>{{ inputVModelCustom }}</p>
      </div>

      <h3>Recursive Custom Input</h3>
      <VModelCustomOuro v-model="inputVModelCustomOuro" />
      <div class="output">
        <h3>Parent component input:</h3>
        <p>{{ inputVModelCustomOuro }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Form {
  display: flex;
  flex-direction: column;
  align-items: center;

  .inputs {
    width: 20vw;
  }

  .output {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
