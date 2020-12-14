<template>
  <div id="app" class="container">
    <b-table striped hover outlined selectable select-mode="single" @row-selected="rowSelected" :items="items" :small="small" :fields="fields" ></b-table>

    {{ selectedItems }}
    
<b-button variant="success" v-on:click="reload">reload</b-button>

    <br>
    {{ variants }}
<br>



  </div>
</template>

<script>
// import { config } from "../config.js";


export default {
  name: "varianttable",
  props: ["variants"],
  created: function() {
    console.log(this.variants)
  },
  data() {
    return {
      selectedItems: {},
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
		{
			key: "chr",
			label: "Chromosome",
			sortable: true,
		},
		{
			key: "pos",
			label: "Position",
			sortable: true,
		},
		{
			key: "ref",
			label: "Ref Allele",
			sortable: true,
		},
		{
			key: "alt",
			label: "Alt Allele",
			sortable: true,
		},
	],
      items: Object.values(this.variants),
      small: true,
    };
  },
  methods: {
    rowSelected(items) {
      this.selectedItems = items;
    },
    reload() {
      this.$refs.table.refresh()
    }
  },
};
</script>


// [
//           { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
//           { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
//           { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
//           { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
// ]
