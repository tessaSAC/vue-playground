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
    <SlotSimple> <slot name="namedSlot" #namedSlot /> <slot /> </SlotSimple>
  </div>
</template>

<style lang="scss" scoped>
.SlotOuro {
  width: 20vw;
  height: 20vw;
  background-color: coral;
}
</style>
