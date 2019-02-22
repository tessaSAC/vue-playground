<script>
import SlotInSlot from '@/components/SlotInSlot'
import SlotMenuBar from '@/components/SlotMenuBar'

export default {
  components: {
    SlotInSlot,
    SlotMenuBar,
  },
}
</script>

<template>
  <div class="Home">
    <SlotMenuBar>
      <template slot="left">
        <div class="menuItem khaki" />
        <div class="menuItem papayaWhip" />
      </template>

      <template slot="right">
        <div class="menuItem lightSalmon" />
        <div class="menuItem coral" />
        <div class="menuItem tomato" />
      </template>
    </SlotMenuBar>

    <SlotInSlot>
      <template #namedSlot>
        <h2>the Named Slot's content</h2>
      </template>
      <p>unnamed slot stuff</p>
    </SlotInSlot>
  </div>
</template>

<style lang="scss" scoped>
.Home {
  .SlotMenuBar {
    height: 5vh;
  }

  .menuItem {
    width: 5vw;
    height: 4vh;
  }

  .khaki {
    background-color: khaki;
  }
  .papayaWhip {
    background-color: papayaWhip;
  }

  .lightSalmon {
    background-color: lightSalmon;
  }
  .coral {
    background-color: coral;
  }
  .tomato {
    background-color: tomato;
  }
}
</style>
