<script>
import SlotSimple from './SlotSimple'

export default {
  components: {
    SlotSimple,
  },
}
</script>

<template>
  <div class="SlotOuro">
    <SlotSimple> 
      
      <slot name="namedSlot" slot="namedSlot" />  <!-- Weirdly, this won't work with #namedSlot instead of slot="namedSlot", although it doesn't matter in Home.vue where it's being used --> 
      
      <slot /> 
      
    </SlotSimple>
  </div>
</template>

<style lang="scss" scoped>
.SlotOuro {
  width: 20vw;
  height: 20vw;
  background-color: coral;
}
</style>
