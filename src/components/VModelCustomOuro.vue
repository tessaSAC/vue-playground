<script>
import VModelCustom from './VModelCustom'

export default {
  components: {
    VModelCustom,
  },

  // Looks like I don't need to specify default value to avoid rendering `undefined` here; I guess the child takes care of it??
  props: [ 'outerFakeValue' ],  // doesn't work with `value` fsr

  model: {
    prop: 'outerFakeValue',
    event: 'input',
  },

  // fsr I don't need `mounted` here -- the child input takes care of it somehow...

  watch: {
    outerFakeValue() { this.updateDOM() }
  },

  methods: {
    updateDOM() {
      // confirmed ref is not child ref of same ref name
      if(this.$refs.customInput.value === this.outerFakeValue) return  // TODO: check if I need this....
      this.$refs.customInput.value = this.outerFakeValue
    },

    updateOuterPropValue(newInput) {
      // this.$emit('input', e.value)  // fsr this cannot be e.target.value -- I think because it is getting the event emitted by the component, not the input and that's just the payload

      this.$emit('input', newInput)  // now it's really just the data
    },
  },
}
</script>

<template>
<!-- This doesn't work at all -->
<!-- <VModelCustom
    class="VModelCustomOuro"
    type="text"
    :propValue="outerProp"
    @input="updateOuterPropValue"
/> -->

<!-- This updates only the outerProp; the @input doesn't do anything either -->
<!-- <VModelCustom
    class="VModelCustomOuro"
    type="text"
    v-model="outerProp"
    @input="updateOuterPropValue"
/> -->

<!--
  TODO: revisit this experiment in the future:
  ~CHECK IF THIS WORKS IF PROP IS VALUE~
  Looks like it does whether with `:value="outerFakeValue" or v-model but says I'm mutating the `value` prop in VModelCustom somehow (???)

  Update: Got it working on DRanks with Vuetify -- not sure if this is Vuetify related or because I don't need to watch/mounted/updateDOM -- can't remember if I tried removing this or not.
-->
<VModelCustom
    ref="customInput"
    class="VModelCustomOuro"
    type="text"
    :fakeValue="outerFakeValue"
    @input="updateOuterPropValue"
/>
</template>
