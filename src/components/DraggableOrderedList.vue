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
			// TODO: replace i => i method with `item` when lodash shorthands config issue is fixed
			return this.configurableList.filter(item => !filter(this.itemsSelected, i => i.label === item.label).length)
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
		<el-checkbox-group class="checkboxGroup" v-model="permanent">
			<el-checkbox v-for="item in resultsPermanent" :key="item.value" :label="item" disabled><span v-html="item.label" /></el-checkbox>
		</el-checkbox-group>

		<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
			<el-checkbox v-for="item in resultsConfigurable" :key="item.value" :label="item">
				<span v-html="item.label" />
			</el-checkbox>
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

			<el-checkbox-group v-model="permanent" class="checkboxGroup static">
				<el-checkbox v-for="item in permanent" :key="item.value" :label="item" disabled ><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>

			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
				<Draggable v-model="itemsSelected" class="Draggable">
					<div v-for="item in itemsAvailable" :key="item.value" class="checkboxDraggable">
						<svg 
							fill="none" 
							height="14" 
							stroke-linejoin="round"
							stroke="rebeccapurple" stroke-width="2" stroke-linecap="round" 
							style="background:pink" 
							viewBox="1 1 1 18.5" 
							width="11" 
							xmlns="http://www.w3.org/2000/svg" 
						>
							<circle cx="-4" cy="3" r="1"/>
							<circle cx="-4" cy="10" r="1"/>
							<circle cx="-4" cy="17" r="1"/>
							<circle cx="6.5" cy="3" r="1"/>
							<circle cx="6.5" cy="10" r="1"/>
							<circle cx="6.5" cy="17" r="1"/>
						</svg>

						<el-checkbox :key="item.value" :label="item">
							<span v-html="item.label" />
						</el-checkbox>
					</div>
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
			
			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup static">
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

.checkboxGroup {
	padding: 0 1rem;
}

.checkboxGroup, .Draggable {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&.static {
		position: relative;
		left: 24px;
	}
}
.checkboxDraggable {
	display: flex;
	align-items: center;

	svg { cursor: move; }

	label { margin-left:  14px; }
}

footer {
	padding: 1rem 0.5rem;
	display: flex;
	justify-content: flex-end;
}
</style>