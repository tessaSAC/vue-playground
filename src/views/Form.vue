<script>
import VModelCustom from '../components/VModelCustom'

export default {
  components: {
    VModelCustom,
  },

  data: _ => ({
    inputVModelCustom: '',
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
