<script>
import DraggableOrderedListVue from './DraggableOrderedList'

export default {
    components: {
        DraggableOrderedListVue,
    },
}
</script>

<template>
<portal selector="#portalTarget">
    <div class="ModalDraggableOrderedList">
            <h1>Modal Title</h1>
            <DraggableOrderedList class="DraggableOrderedList" /> 


            <footer>
                <el-button type="info" plain @click="emitCancel">Cancel</el-button>
                <el-button type="success" plain @click="emitChanges">Save</el-button>
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