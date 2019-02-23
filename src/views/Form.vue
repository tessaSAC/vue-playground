<script>
import RadioList from '../components/RadioList'
import VModelCustom from '../components/VModelCustom'

export default {
  components: {
    RadioList,
    VModelCustom,
  },

  data: _ => ({
    inputVModelCustom: '',
    radioSelected: '2',
  }),
}
</script>

<template>
  <div class="Form">
    <div class="inputs">
      <VModelCustom v-model="inputVModelCustom" />
      <div class="output">
        <h3>Parent component input:</h3>
        <p>{{ inputVModelCustom }}</p>
      </div>

      <!-- <input
        id="one"
        ref="one"
        value="one"
        type="radio"
        v-model="radioSelected"
      >
      <label for="one">one</label> -->
      <RadioList v-model="radioSelected" />
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
