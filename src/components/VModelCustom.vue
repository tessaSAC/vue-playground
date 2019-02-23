<script>
import { timeout } from 'q';
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  watch: {
    // update input field to reflect programmatic changes:
    value(newVal) {
      if(this.$refs.customInput.value === this.value) return  // don't update if the DOM matches the current prop
      this.$refs.customInput.value = this.value
    }
  },

  methods: {
    updateValue(e) {
      // this.$emit('input', this.$refs.customInput.value) // can't use this.value directly -- will not update this way idky
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
    @input="updateValue"
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
