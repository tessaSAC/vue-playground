<template>
  <div class="SlotMenuBar">
    <div class="left">
      <slot name="left" />
    </div>

    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss">
.SlotMenuBar {
  width: 100%;
  background-color: thistle;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .left, .right {
    display: flex;
    align-items: center;
  }
}
</style>
