<script>
import VModelCustom from './VModelCustom'

export default {
  components: {
    VModelCustom,
  },

  props: {
    outerProp: {
      type: String,
      default: '',
    },
  },

  methods: {
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

<VModelCustom
    class="VModelCustomOuro"
    type="text"
    :propValue="outerProp"
    @input="updateOuterPropValue"
/>
</template>
