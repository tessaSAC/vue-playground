<template>
<div class="SlotSimple">

  <span class="named">
    <slot name="namedSlot" />
  </span> 

  <slot />
  
</div>
</template>

<style lang="scss">
.SlotSimple {
  width: 10vw;
  height: 10vw;
  background-color: papayaWhip;

  .named {
    display:block;
    background-color: lightcyan;
  }
}
</style>
