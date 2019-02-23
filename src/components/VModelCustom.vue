<script>
export default {
  props: {
    propValue: {
      type: String,
      default: '',
    },
  },

  methods: {
    updatePropValue(e) {
      // this.$emit('input', this.$refs.customInput.value) // can't use this.propValue directly -- will not update this way idky
      // I wonder if this is the right way to do it though
      // source: https://alligator.io/vuejs/add-v-model-support

      this.$emit('input', e.target.value)  // this is equivalent...I think?

      // https://scotch.io/tutorials/add-v-model-support-to-custom-vuejs-component -- can't figure out why this works in the code pen but not here -- is the functional component different somehow?
    },
  },
}
</script>

<template>
<div class="VModelCustom">
  <input
    ref="customInput"
    type="text"
    :value="propValue"
    @input="updatePropValue"
  />

  <!--
    this doesn't work; hard to tell if it's because it's not recommended or the timing/hierarchy is off or I'm doing something wrong
  -->
  <!-- <h3>Self-component input:</h3> <p>{{ $refs.customInput.value }}</p> -->
</div>
</template>

<style lang="scss">
.VModelCustom {
  input {
    width: 100%;
  }
}
</style>
