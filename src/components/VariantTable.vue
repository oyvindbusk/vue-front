<template>
  <div id="app" class="container">
    <b-table ref="table" striped hover outlined selectable select-mode="single" stacked="md" @row-selected="rowSelected" :items="variants" :small="small" :fields="fields" >
    
    <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>

    </b-table>
    
    {{ selectedItems }}
    <br>
    <button v-on:click="filterVariants" id="button" class="btn btn-secondary">Filter</button>

    <br>
    {{ variants }}
    <br>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
<br>



  </div>
</template>

<script>
import { config } from "../config.js";


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
      fields: config.vartablefields,
      small: true,
      infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
    };
  },
  methods: {
    rowSelected(variants) {
      this.selectedItems = variants;
    },
    filterVariants: function() {
      this.variants = this.variants.filter(variants => variants.chr > "1")
    },
    info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
  },
};
</script>


// [
//           { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
//           { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
//           { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
//           { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
// ]
