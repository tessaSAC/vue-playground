<script>
import { filter } from 'lodash'

import Draggable from 'vuedraggable'

export default {
	components: {
		Draggable,
	},

	props: {
		configurableList: {
			type: Array,
			default: _ => [
				{ label: 'abyssinian', value: '01' },
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
			default: _ => [{ label: 'sheba', value: '00' }],
		},

		selected: {
			type: Array,
			default: _ => [{ label: 'abyssinian', value: '01' }],
		}
	},

	data: _ => ({
		itemsSelected: [],
		searchTerm: '',
	}),

	computed: {
		itemsAvailable() {
			return this.configurableList.filter(item => !filter(this.itemsSelected, item).length)
		},

		numSelected() {
			return this.itemsSelected.length + this.permanent.length
		},

		resultsPermanent() {
			return this.filterListBySearchTerm(this.permanent)
		},

		resultsConfigurable() {
			return this.filterListBySearchTerm([ ...this.itemsSelected, ...this.itemsAvailable ])
		},
	},

	created() {
		this.itemsSelected = [...this.selected]
	},

	methods: {
		clearAll() {
			this.itemsSelected = []
		},

		emitCancel() {
			this.$emit('cancel')
		},

		emitChanges() {
			this.$emit('save', this.itemsSelected)
		},

		filterListBySearchTerm(list) {
			return list.filter(({ label }) => label.toLowerCase().includes(this.searchTerm.toLowerCase()))
		},

		selectAll() {
			this.itemsSelected = [...this.configurableList]
		}
	}
}
</script>

<template>
<div class="DraggableOrderedList">
<h1>Modal Title</h1>

<label>Select and drag to reorder the metrics you'd like to see.</label>

<el-input
  placeholder="Search product metrics..."
  v-model="searchTerm"
  clearable
	prefix-icon="el-icon-search"
/>

	<template v-if="searchTerm">
		<el-checkbox-group class="allCheckboxes" v-model="permanent">
			<el-checkbox v-for="item in resultsPermanent" :key="item.value" :label="item" disabled><span v-html="item.label" /></el-checkbox>
		</el-checkbox-group>

		<el-checkbox-group v-model="itemsSelected" class="allCheckboxes">
			<el-checkbox v-for="item in resultsConfigurable" :key="item.value" :label="item"><span v-html="item.label" /></el-checkbox>
		</el-checkbox-group>
	</template>

	<el-collapse v-else>
		<el-collapse-item title="Selected items" name="selected items">
			<template slot="title">
				<div class="sectionLabel">
					<h2>
						Selected metrics
						<span class="numSelected">({{ numSelected }})</span>
					</h2>
					<a @click.stop="clearAll">Clear all</a>
				</div>
			</template>

			<el-checkbox-group v-model="permanent" class="allCheckboxes">
				<el-checkbox v-for="item in permanent" :key="item.value" :label="item" disabled ><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>

			<el-checkbox-group v-model="itemsSelected" class="allCheckboxes">
				<Draggable v-model="itemsSelected" class="Draggable">
					<el-checkbox v-for="item in itemsSelected" :key="item.value" :label="item"><span v-html="item.label" /></el-checkbox>
				</Draggable>
			</el-checkbox-group>
		</el-collapse-item>

		<el-collapse-item title="Available items" name="available items">
			<template slot="title">
				<div class="sectionLabel">
					<h2>
						Available metrics
						<span class="numSelected">({{ itemsAvailable.length }})</span>
					</h2>
					<a @click.stop="selectAll">Select all</a>
				</div>
			</template>
			
			<el-checkbox-group v-model="itemsSelected" class="allCheckboxes">
				<el-checkbox v-for="item in itemsAvailable" :key="item.value" :label="item"><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>
		</el-collapse-item>
	</el-collapse>

	<footer>
		<el-button type="info" plain @click="emitCancel">Cancel</el-button>
		<el-button type="success" plain @click="emitChanges">Save</el-button>
	</footer>
</div>
</template>

style <style lang="scss" scoped>
.sectionLabel {
	width: 100%;
	padding: 0 1rem;

	display: flex;
	justify-content: space-between;

	h2 { 
		font-size: 1rem; 
		
		.numSelected {
			color: powderblue;
		}
	}
}

.allCheckboxes {
	padding: 0 1rem;
}

.allCheckboxes, .Draggable {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

footer {
	padding: 1rem 0.5rem;
	display: flex;
	justify-content: flex-end;
}
</style>