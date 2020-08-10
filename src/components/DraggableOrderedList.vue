<!--
  	A list with
		• Search bar
		• Checked items section (draggable)
		• Unchecked items section (_not_ draggable)

  	Props:
		• listType: What kind of items are in the list (e.g. 'Metrics')

		• configurable: Array of { label, value } items that can be checked and drag-and-dropped
			• {
				label: What to display next to the checkbox; Can be a string or, where custom html is needed, a template 
				value: Identifying data unique to each list item
			  }
		• immutable: Array of { label, value } items that are disabled, permanently checked and can NOT be drag-and-dropped (e.g. "pinned" items)
		• selected: Array of { label, value } items that are checked and can be unchecked or drag-and-dropped; a subset of `configurable`

	Slots:
		• searchEmptyState: A centered slot with styled h2 (p & a tags inherit default styles) for view when no results match search
			• Default content: Link that clears search and focuses on search input
		• default: A scoped slot with slot prop `listItem` that gets passed to all checkboxes except immutable (includes search results)

	Events:
		• updated-configuration: Emitted with new array of selected items whenever the order or selection is changed

	Example Usage: ModalDraggableOrderedList
-->

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

		listType: {
			type: String,
			default: 'items',
		},

		selected: {
			type: Array,
			default: _ => [],
		},
	},

	data: _ => ({
		expandedSections: [ 'Selected items' ],
		itemsSelected: [],
		searchTerm: '',
	}),

	computed: {
		hasSearchResults() { 
			return this.resultsImmutable.length + this.resultsConfigurable.length 
		},

		itemsAvailable() {
			// TODO: replace i => i method with `item` when lodash shorthands config issue is fixed
			return this.configurable.filter(item => !filter(this.itemsSelected, i => i.label === item.label).length)
		},

		listTypeLowerCased() { return this.listType.toLowerCase() },

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

		if(this.itemsAvailable.length) this.expandedSections.push('Available items')
	},

	methods: {
		clearAllSelections() {
			this.itemsSelected = []
		},
        
        clearSearchTerm() {
            this.searchTerm = ''
            this.$refs.search.focus();
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
		v-model="searchTerm"
		:placeholder="`Search ${ listTypeLowerCased }...`"
		clearable
		prefix-icon="el-icon-search"
	/>

	<!-- Search results -->
	<template v-if="searchTerm">
		<template v-if="hasSearchResults">
			<el-checkbox-group class="checkboxGroup" v-model="immutable">
				<el-checkbox v-for="item in resultsImmutable" :key="item.value" :label="item" class="checkbox" disabled><span v-html="item.label" /></el-checkbox>
			</el-checkbox-group>

			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
				<el-checkbox v-for="item in resultsConfigurable" :key="item.value" :label="item" class="checkbox">
					<slot v-bind:listItem="item">
						<span v-html="item.label" />
					</slot>
				</el-checkbox>
			</el-checkbox-group>

        	<a @click="clearSearchTerm">Return to full list</a>
		</template>

		<div v-else class="searchEmptyState">
			<slot name="searchEmptyState">
                <a @click="clearSearchTerm">Try another search term</a>
            </slot>
		</div>
	</template>

	<!-- Collapsible Lists -->
	<el-collapse v-else v-model="expandedSections">
		<el-collapse-item title="Selected items" name="Selected items">
			<template slot="title">
				<div class="sectionLabel">
					<h2>
						Selected {{ listTypeLowerCased }}
						<span class="numSelected">({{ numSelected }})</span>
					</h2>
					<a @click.stop="clearAllSelections">Clear all</a>
				</div>
			</template>

			<!-- Pinned List -->
			<el-checkbox-group v-model="immutable" class="checkboxGroup undraggable">
				<el-checkbox v-for="item in immutable" :key="item.value" :label="item" disabled class="checkbox">
					<span v-html="item.label" />
				</el-checkbox>
			</el-checkbox-group>

			<!-- Draggable List -->
			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup">
				<Draggable v-model="itemsSelected" class="Draggable">
					<div v-for="item in itemsSelected" :key="item.value" class="checkbox checkboxDraggable">
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
							<slot v-bind:listItem="item">
								<span v-html="item.label" />
							</slot>
						</el-checkbox>
					</div>
				</Draggable>
			</el-checkbox-group>
		</el-collapse-item>

		<!-- Unselected List -->
		<el-collapse-item title="Available items" name="Available items">
			<template slot="title">
				<div class="sectionLabel">
					<h2>
						Available {{ listTypeLowerCased }}
						<span class="numSelected">({{ itemsAvailable.length }})</span>
					</h2>
					<a @click.stop="selectAll">Select all</a>
				</div>
			</template>
			
			<el-checkbox-group v-model="itemsSelected" class="checkboxGroup undraggable">
				<el-checkbox v-for="item in itemsAvailable" :key="item.value" :label="item" class="checkbox">
					<slot v-bind:listItem="item">
						<span v-html="item.label" />
					</slot>
				</el-checkbox>
			</el-checkbox-group>
		</el-collapse-item>
	</el-collapse>
</div>
</template>

<style lang="scss">
$checkboxHorizontalMargin: 10px;

.searchEmptyState {
	height: calc(100% - 100px);  // excludes approximate height of search input
    min-height: 30px;  // otherwise above rule will move inline content behind input
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
	background: rgba( pink, 0.2 );

	box-sizing: border-box;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	
	&.undraggable {
		margin-left: $checkboxHorizontalMargin + 11px;  // width of Draggable icon
	}

    .checkbox + .checkbox {
      margin-top: 4px;
    }

	.el-checkbox { 
		margin-right: 0; 
	}
	.el-checkbox__label {
		background: rgba( orange, 0.2 );
		width: calc(100% - #{ $checkboxHorizontalMargin * 2 });
	}
	
	label {
		background: rgba( rebeccapurple, 0.1 );

		width: 100%;
		text-align: left;
	}
}

.checkboxDraggable {
    display: flex;
    align-items: center;

	svg { cursor: move; }

	label { margin-left:  $checkboxHorizontalMargin; }
}
</style>