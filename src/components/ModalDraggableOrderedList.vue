<script>
import DraggableOrderedList from './DraggableOrderedList'

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
        
        <DraggableOrderedList 
            v-bind="$attrs" 
            class="DraggableOrderedList" 
            :listType="listType"
            @updated-configuration="updateTemporaryChanges"
        /> 

        <footer>
            <el-button type="info" plain @click="emitCancel">Cancel</el-button>
            <el-button type="success" plain @click="emitFinalConfiguration">Save</el-button>
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

    footer {
        padding: 1rem 0.5rem;
        display: flex;
        justify-content: flex-end;
    }

}

</style>