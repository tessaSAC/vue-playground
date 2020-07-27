<script>
// Possible TODO: figure out why Form name (was never in component options except when I was trying to figure this out) stopped working and after cutting and repasting it worked again

import DraggableOrderedList from '../components/DraggableOrderedList'
import ModalDraggableOrderedList from '../components/ModalDraggableOrderedList'
import RadioList from '../components/RadioList'
import VModelCustom from '../components/VModelCustom'
import VModelCustomOuro from '../components/VModelCustomOuro'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    DraggableOrderedList,
    ModalDraggableOrderedList,
    RadioList,
    VModelCustom,
    VModelCustomOuro,
  },
  
  data: _ => ({
    inputVModelCustom: 'passed in prop',
    inputVModelCustomOuro: 'passed in prop',
  }),

  computed: {
    ...mapGetters([ 'modalFocusedIsOpen' ])
  },

  mounted() {
    setTimeout(() => {
      this.inputVModelCustom = 'delayed prop change'
      this.inputVModelCustomOuro = 'delayed prop change'
    }, 500);
  },

  methods: {
    ...mapMutations({ openModalFocused: 'toggleModalFocused' }),
  },
}
</script>

<template>
<div class="Form">
  <DraggableOrderedList class="DraggableOrderedList" />
  <el-button type="warning" plain @click="openModalFocused">Open modal</el-button>

  <ModalDraggableOrderedList v-if="modalFocusedIsOpen" />

  <BaseVerticalSpacing2 />

  <div class="inputs">
    <h3>Custom Input</h3>
    <VModelCustom v-model="inputVModelCustom" />
    <div class="output">
      <h3>Parent component input:</h3>
      <p>{{ inputVModelCustom }}</p>
    </div>
    <button @click="inputVModelCustom = 'change it again'">change it again</button>

    <h3>Recursive Custom Input</h3>
    <VModelCustomOuro v-model="inputVModelCustomOuro" />
    <div class="output">
      <h3>Parent component input:</h3>
      <p>{{ inputVModelCustomOuro }}</p>
    </div>
    <button @click="inputVModelCustomOuro = 'some recursive val'">change it again</button>
  </div>
</div>
</template>

<style lang="scss" scoped>
.Form {
  display: flex;
  flex-direction: column;
  align-items: center;

  .inputs {
    width: 20vw;
  }

  .output {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
