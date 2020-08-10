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
    editableList: {
      configurable: [
        { label: 'abyssinian', value: '01', secret: 'cody' },
        { label: '<strong>american shorthair</strong>', value: '02' },
        { label: 'texel', value: '03' },
        { label: 'teddy', value: '04' },
        { label: 'peruvian', value: '05' },
        { label: 'sheltie', value: '06' },
        { label: 'himalayan', value: '07' }
      ],
      immutable: [{ label: 'sheba', value: '00' }, { label: 'sheba2', value: '08' }],
      selected: [{ label: 'abyssinian', value: '01', secret: 'cody' }],
    },

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
    // Wow you can alias the same thing twice idk if this is good or not though lmao
    ...mapMutations({ 
      closeModalFocused: 'toggleModalFocused',
      openModalFocused: 'toggleModalFocused',
    }),

    printListItemSecret(secret) {
      if(secret) console.log(secret)
      else console.log('mum\'s the word')
    },

    updateConfigurableList(newList) {
      this.$set(this.editableList, 'selected', newList)
      this.closeModalFocused()
    }
  },
}
</script>

<template>
<div class="Form">
  <DraggableOrderedList 
    v-bind="editableList" 
    class="DraggableOrderedList"
    listType="Bbs"
    v-slot="{ listItem }"
    @updated-configuration="newConfig => editableList.selected = newConfig"
  >
    <div class="slotWithProps">
      <h3>{{ listItem.label }}</h3>
      <el-button type="primary" @click="printListItemSecret(listItem.secret)">Tell me your secret!</el-button>
    </div>
  </DraggableOrderedList>

  <el-button type="warning" plain @click="openModalFocused">Open modal</el-button>
  <ModalDraggableOrderedList 
    v-if="modalFocusedIsOpen" 
    v-bind="editableList"
    listType="Bbs"
    @save="updateConfigurableList"
    @cancel="closeModalFocused" 
  />

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

  .DraggableOrderedList { 
    min-width: 35vw; 
    margin-bottom: 2rem;

    .slotWithProps {
      background: rgba( #1CDBC4, 0.1 );

      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
  }

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
