<template>
	<div id="app" class="container" >
		<b-table
			ref="table"
			striped
			hover
			outlined
			selectable
			:filter="filter"
			:filter-included-fields="filterOn"
			select-mode="single"
			stacked="md"
			@row-selected="rowSelected"
			:items="variants"
			:small="small"
			:fields="fields"
			@filtered="onFiltered"
		>
			<template #cell(name)="row">
				{{ row.value.first }} {{ row.value.last }}
			</template>

			<template #cell(actions)="row">
				<b-button
					size="sm"
					@click="info(row.item, row.index, $event.target)"
					class="mr-1"
				>
					Info modal
					
				</b-button>
			</template>

		</b-table>

		{{ selectedItems }}
		<br />
		<button v-on:click="filterVariants" id="button" class="btn btn-secondary">
			Filter
		</button>

			<button v-on:click="unfilterVariants" id="button" class="btn btn-secondary">
			Clear Filter
		</button>
	<br>
	
		{{ variants }}
		<br />
		<b-modal
			:id="infoModal.id"
			:title="infoModal.title"
			ok-only
			@hide="resetInfoModal"
		>
			<pre> Comment and class for variant:
		<div class="form-row">  
			<div class="form-group col-md-8">
				<label>Comment --{{ variants[selectedRowIndex].comment }}-- </label>
			<b-form-textarea v-model="variants[selectedRowIndex].comment" id="textarea" size="sm" placeholder="Comment here: "></b-form-textarea>
			</div>
			
			<div class="form-group col-md-3">
				<label>Class</label>
			<b-form-select :options="options"  class="py-sm-0 form-control"></b-form-select>
			</div>    
		</div>
			{{ infoModal.content }}</pre>
		</b-modal>
		<br />
	</div>
</template>

<script>
import { config } from "../config.js";
import helper_funcs from "@/helpers"
import { mapGetters } from 'vuex'


export default {
	name: "varianttable",
	props: ["variants"],
	created: function () {},
	data() {
		return {
			selectedItems: {},
			selectedRowIndex: 0,
			fields: config.vartablefields,
			small: true,
			infoModal: {
				id: "info-modal",
				title: "",
				content: "",
			},
			options: [
					{ value: null, text: 'Please select an option' },
					{ value: 1, text: '1' },
					{ value: 2, text: '2' },
					{ value: 3, text: '3' },
					{ value: 4, text: '4' },
					{ value: 5, text: '5' },
					{ value: 'U', text: 'U' },
			],
			//Filter logic
			totalRows: 1,
			filter: 'true',
			filterOn: ['visibility'],
		};
	},
	methods: {
		rowSelected(line) {
			this.selectedItems = line;
		},
		filterVariants: function () {
			const filterd = this.variants.map(helper_funcs.set_vis_false)
			Array.prototype.forEach.call(this.filters, filter => {
				Array.prototype.push.apply(filterd, this.variants.map(helper_funcs.filter_variants, {filter: filter}));
			})
			const uniq = new Set(filterd.map(e => JSON.stringify(e))); // Remove dups are nescecary because of way filters are structured.
			const res = Array.from(uniq).map(e => JSON.parse(e));
			this.$emit("update:variants",res);
		},
		unfilterVariants: function () {
			this.$emit("update:variants", this.variants.map(helper_funcs.set_vis_true));
		},

		info(item, index, button) {
			this.selectedRowIndex = index
			this.infoModal.title = `Row index: ${index}`;
			this.infoModal.content = JSON.stringify(item, null, 2)
			console.log(this.variants[index].comment)
			this.$root.$emit("bv::show::modal", this.infoModal.id, button);
		},
		resetInfoModal() {
			this.infoModal.title = "";
			this.infoModal.content = "";
		},
		onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.totalRows = filteredItems.length
				this.currentPage = 1
			}
		
	},
	computed: {
		...mapGetters(['filters'])
	},
	
};
</script>
