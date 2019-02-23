<script>
import { timeout } from 'q';
export default {
  props: {
    // value: {    // prop value doesn't change (at least in dev tools) when name is not `value` -- parent can still see changed data but not self fsr
    //   type: String,
    //   default: '',
    // },

    fakeValue: {  // not specifying type or using props' array form works fine for `null` and string initial values but not `undefined`
      type: String,
      default: '',
    },  // using `model` appears to resolve the issue
    // learned `someProp: someDefaultValue` doesn't work today -- sad day
  },

  model: {
    prop: 'fakeValue',
    event: 'input'
  },

  watch: {
    // update input field to reflect programmatic changes:
    fakeValue() {
      this.updateDOM()
    }
  },

  created() { console.log(this.fakeValue) },  // this.value doesn't exist

  // render passed in search value
  mounted() { this.updateDOM() },

  methods: {
    updateDOM() {
      if(this.$refs.customInput.value === this.fakeValue) return  // don't update if the DOM matches the current prop
      this.$refs.customInput.value = this.fakeValue
    },

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
  <!-- don't need to pass in :value for `value` prop... and model props as well I guess??? -->

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
