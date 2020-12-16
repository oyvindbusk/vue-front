<template>
  <div id="app" class="container" >
    <b-table
      ref="table"
      striped
      hover
      outlined
      selectable
      select-mode="single"
      stacked="md"
      @row-selected="rowSelected"
      :items="Object.values(variants)"
      :small="small"
      :fields="fields"
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

    <br />
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
        <label>Comment</label>
      <b-form-textarea
        id="textarea"
        size="sm"
        placeholder="Comment here: "
        
      ></b-form-textarea>
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

export default {
  name: "varianttable",
  props: ["variants"],
  created: function () {},
  data() {
    return {
      selectedItems: {},
      h: "test",
      // Note 'isActive' is left out and will not appear in the rendered table
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
      ]
    };
  },
  methods: {
    rowSelected(variants) {
      this.selectedItems = variants;
    },
    filterVariants: function () {
      this.$emit(
        "update:variants",
        this.variants.filter((variants) => variants.chr > "1")
      );
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    
  },
  computed: {},
};
</script>
