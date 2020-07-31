<script>
import { filter } from 'lodash'

import Draggable from 'vuedraggable'

export default {
	components: {
		Draggable,
	},

	props: {
		configurable: {
			type: Array,
			default: _ => []
		},

		immutable: {
			type: Array,
			default: _ => [],
		},

		selected: {
			type: Array,
			default: _ => [],
		},
	},

	data: _ => ({
		itemsSelected: [],
		searchTerm: '',
	}),

	computed: {
		itemsAvailable() {
			// TODO: replace i => i method with `item` when lodash shorthands config issue is fixed
			return this.configurable.filter(item => !filter(this.itemsSelected, i => i.label === item.label).length)
		},

		hasSearchResults() { 
			return this.resultsImmutable.length + this.resultsConfigurable.length 
		},

		numSelected() {
			return this.itemsSelected.length + this.immutable.length
		},

		resultsImmutable() {
			return this.filterListBySearchTerm(this.immutable)
		},

		resultsConfigurable() {
			return this.filterListBySearchTerm([ ...this.itemsSelected, ...this.itemsAvailable ])
		},
	},

	watch: {
		itemsSelected(newConfiguration) {
			if(newConfiguration) this.$emit('updated-configuration', newConfiguration)
		}
	},

	created() {
		this.itemsSelected = [...this.selected]
	},

	methods: {
		clearAll() {
			this.itemsSelected = []
		},

		filterListBySearchTerm(list) {
			return list.filter(({ label }) => label.toLowerCase().includes(this.searchTerm.toLowerCase()))
		},

		selectAll() {
			this.itemsSelected = [...this.configurable]
		}
	}
}
</script>

<template>
<div class="DraggableOrderedList">
<el-input
  placeholder="Search product metrics..."
  v-model="searchTerm"
  clearable
	prefix-icon="el-icon-search"
/>

	<template v-if="searchTerm">
		<template v-if="hasSearchResults">
			<el-checkbox-group class="checkboxGroup" v-model="immutable">
				<el-checkbox v-for="item in resultsImmutable" :key="item.value" :label="item" disabled><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>

			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
				<el-checkbox v-for="item in resultsConfigurable" :key="item.value" :label="item">
					<span v-html="item.label" />
				</el-checkbox>
			</el-checkbox-group>
		</template>

		<div v-else class="searchEmptyState">
			<slot name="searchEmptyState" />
		</div>
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

			<el-checkbox-group v-model="immutable" class="checkboxGroup immutable">
				<el-checkbox v-for="item in immutable" :key="item.value" :label="item" disabled ><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>

			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
				<Draggable v-model="itemsSelected" class="Draggable">
					<div v-for="item in itemsSelected" :key="item.value" class="checkboxDraggable">
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
</div>
</template>

style <style lang="scss" scoped>
.searchEmptyState {
	height: calc(100% - 100px);  // excludes approximate height of search input
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	h2 {
		margin: 0;
	}
}

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
</style>