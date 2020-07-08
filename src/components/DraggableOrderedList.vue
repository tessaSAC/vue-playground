<script>
import Draggable from 'vuedraggable'

export default {
	components: {
		Draggable,
	},

	props: {
		completeList: {
			type: Array,
			default: [
				{ label: '<strong>american shorthair</strong>', value: '02' },
				{ label: 'texel', value: '03' },
				{ label: 'teddy', value: '04' },
				{ label: 'peruvian', value: '05' },
				{ label: 'sheltie', value: '06' },
				{ label: 'himalayan', value: '07' }
			]
		},

		permanent: {
			type: Array,
			default: [{ label: 'sheba', value: '00' }],
		},

		selected: {
			type: Array,
			default: [{ label: 'abbyssinian', value: '01' }],
		}
	},

	data: _ => ({
		itemsSelected: [],
	}),

	computed: {
		itemsAvailable() {
			return this.completeList.filter(item => !this.itemsSelected.includes(item))
		}
	},

	created() {
		this.itemsSelected = [...this.selected]
	},
}
</script>

<template>
<div class="DraggableOrderedList">
<!-- Modal title -->

<!-- label -->
Select and drag to reorder the metrics you'd like to see.
<!-- search input -->

	<el-collapse>

		<el-collapse-item title="Selected items" name="selected items">
			<template slot="title">
				Selected metrics (numSelected)
				<a>Clear all</a>
			</template>

			<el-checkbox-group v-model="itemsSelected" class="allCheckboxes">
				<el-checkbox v-for="item in permanent" :key="item.value" :label="item" :checked="true" disabled ><span v-html="item.label" /></el-checkbox>

				<!-- draggable disabled if search mode -->
				<Draggable v-model="itemsSelected" class="Draggable">
					<el-checkbox v-for="item in itemsSelected" :key="item.value" :label="item"><span v-html="item.label" /></el-checkbox>
				</Draggable>
			</el-checkbox-group>
		</el-collapse-item>

		<el-collapse-item title="Available items" name="available items">
			<template slot="title">
				Available metrics (numAvailable)
				<a>Select all</a>
			</template>
			
			<el-checkbox-group v-model="itemsSelected" class="allCheckboxes">
				<el-checkbox v-for="item in itemsAvailable" :key="item.value" :label="item"><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>
		</el-collapse-item>
		</el-collapse-item> 
		
	</el-collapse>


<!-- Cancel -->
<!-- Save -->
</div>
</template>

style <style lang="scss" scoped>
.allCheckboxes, .allCheckboxes .Draggable {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
</style>