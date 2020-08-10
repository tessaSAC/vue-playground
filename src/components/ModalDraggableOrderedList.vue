<!--
  A modal with
    • A Title
	• A [x](close) button
    • DraggableOrderedList
    • A Cancel button
	• A Save button

  Props
    • listType: What kind of items are in the list (e.g. 'Metrics')

  Attrs
    • Remaining props needed by CoreListEditable passed via $attrs [
		configurable,
		immutable,
		selected
	  ]

  Slots
    • searchEmptyState: Forwards contents to CoreListEditable's `searchEmptyState` slot
	• default: Forwards contents to CoreListEditable's `default` slot

  Events
    • exit-modal: Emitted when [x](close), Cancel, or Save buttons are clicked
	• updated-list: Emitted with a payload of the updated list when the Save button is clicked

  Example Usage
    • Metrics
-->

<script>
import DraggableOrderedList from './DraggableOrderedList'

import { isEqual } from 'lodash'

export default {
    components: {
        DraggableOrderedList,
    },

    data: _ => ({
        temporaryChanges: [],
    }),

    props: {
        listType: {
            type: String,
            default: 'items',
        },
    },

    computed: {
        noChangesMade() {
            return isEqual(this.$attrs.selected, this.temporaryChanges)
        }
    },

    methods: {
        emitCancel() {
			this.$emit('cancel')
		},

		emitFinalConfiguration() {
			this.$emit('save', this.temporaryChanges)
        },
        
        updateTemporaryChanges(updatedConfiguration) {
            this.temporaryChanges = updatedConfiguration
        }
    }
}
</script>

<template>
<portal selector="#portalTarget">
    <div class="ModalDraggableOrderedList">
        <h1>Edit {{ listType }}</h1>
        <a class="buttonClose" @click="emitCancel">x</a>
        
        <DraggableOrderedList 
            v-bind="$attrs" 
            class="DraggableOrderedList" 
            :listType="listType"
            @updated-configuration="updateTemporaryChanges"
        > 
            <!-- Pass searchEmptyState slot content on; will not work completely as expected with `#` shorthand -->
		    <slot name="searchEmptyState" slot="searchEmptyState" />

            <!-- Pretty gross; This is grabbing the slot prop from DraggableOrderedList -->
		    <template v-slot="{ listItem }">
                <!-- This assigns the above prop to `listItem` for the parent of ModalDraggableOrderedList -->
                <slot v-bind:listItem="listItem" />
            </template>
        </DraggableOrderedList>

        <footer>
            <el-button type="info" plain @click="emitCancel">Cancel</el-button>
            <el-button :disabled="noChangesMade" type="success" plain @click="emitFinalConfiguration">Save</el-button>
        </footer>
    </div>
</portal>
</template>

<style lang="scss">
.ModalDraggableOrderedList {
    padding: 2rem 1rem;
    
    width: 100%;
    height: 100%;
    min-width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .buttonClose {
        position: relative;
        top: -5rem;
        font-size: 2rem;
        text-align: right;
    }

    footer {
        padding: 1rem 0.5rem;
        display: flex;
        justify-content: flex-end;
    }

}

</style>