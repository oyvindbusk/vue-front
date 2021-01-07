<template>
  <div id="app" class="container">

    <b-tabs v-if="Object.keys(this.filters).length > 1" v-model="active_tab" content-class="mt-3">
      <!-- This is shown if filterchain is present. -->
        <b-tab v-for="(filter, index) in filters" :key="index" :title="index" active ></b-tab>
    </b-tabs>
    

{{selectedItems}}

<div v-if="!loading">
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
          Info
        </b-button>

      </template>
    </b-table>

    <br />
  <b-button-group>
    <button v-on:click="filterVariants" id="button" class="btn btn-success">
      Filter
    </button>
    <button v-on:click="unfilterVariants" id="button" class="btn btn-info">
      Clear Filter
    </button>
  </b-button-group>
    <br>
    
    <!-- {{ variants }} -->
    <br />
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      size="lg"
      @hide="
        resetInfoModal();
        updateVariants();
      "
    >
      <b-container fluid>
        
        <pre>Set comment and class for variant:</pre>

        <b-row class="mb-1">
          <b-col cols="10">
            <label>Comment</label>

            <b-form-textarea
              v-model="variants[selectedRowIndex].comment"
              @keyup="
                $emit('update:variants', variants);
                setChanged();
              "
              id="textarea"
              size="sm"
              placeholder="Comment here: "
            ></b-form-textarea>

          </b-col>
          <b-col cols="2">
            <label>Class</label>
            <b-form-select
              :options="options"
              v-model="variants[selectedRowIndex].class"
              @change="$emit('update:variants', variants);setChanged();"
              class="py-sm-0 form-control"
            ></b-form-select>
          </b-col>
        </b-row>
        <pre>
        {{ infoModal.content }}
		</pre>
    
      </b-container>
    </b-modal>
    <br />
    
    </div>
  </div>
</template>

<script>
import { config } from "../config.js";
import helper_funcs from "@/helpers";
import { mapGetters } from "vuex";



export default {
  name: "varianttable",
  props: ["variants", "loading", "fields"],
  created: function () {
    // Get username
    this.$store.dispatch("initUserStore");
  },
  data() {
    return {
      // fields: config.vartablefields,
      username: this.$store.getters.username,
      selectedItems: {},
      selectedRowIndex: 0,
      small: true,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      options: config.classOptions,
      // Filter logic
      totalRows: 1,
      filter: "true",
      filtersapplied: false,
      filterOn: ["visibility"],
      active_tab: 0
      
      
    };
  },
  methods: {
    rowSelected(line) {
      // Get the selected row in the table
      this.selectedItems = line;
    },



    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    filterVariants: function () {
      this.filtersapplied = true
      const filterd = this.variants.map(helper_funcs.set_vis_false); // Set all variants hidden
      // Check if regular or chain filtering:
      
      console.log(Object.keys(this.filters))
      if (Object.keys(this.filters)[0]  === "regular") {
          Array.prototype.forEach.call(this.filters.regular, (filter) => {
          Array.prototype.push.apply(filterd, this.variants.map(helper_funcs.filter_variants, { filter: filter})
        );
      });
      const uniq = new Set(filterd.map((e) => JSON.stringify(e))); // Remove dups are necescary because of way filters are structured.
      const res = Array.from(uniq).map((e) => JSON.parse(e));
      this.$emit("update:variants", res); // two way data binding to the variants-view
      } else { // Startloop
        console.log("chain filters")
        // For each filter
        // filter and add key as a separate badge in the actions col
        // If Filter has inheritance: "AR" Then do something with that
        console.log(Object.keys(this.filters))
        for (const [key, value] of Object.entries(this.filters)) {

          console.log(`${key}: ${value}`);
            Array.prototype.forEach.call(this.filters[key], (filter) => {
              Array.prototype.push.apply(filterd, this.variants.map(helper_funcs.filter_variants, { filter: filter, inheritance: key})
              );
            });
          
          // Set correct inheritance mode for the variants:
          // for each variant in res if visibility is true -> Add key
          const uniq = new Set(filterd.map((e) => JSON.stringify(e))); // Remove dups are necescary because of way filters are structured.
          const res = Array.from(uniq).map((e) => JSON.parse(e));
    
        this.$emit("update:variants", res); // two way data binding to the variants-view
          
        }
        

       

      



        } // endloop
   
    },



















    unfilterVariants: function () {
      this.filtersapplied = false
      this.$emit(
        "update:variants",
        this.variants.map(helper_funcs.set_vis_true).map(helper_funcs.set_inheritance_clear)
      )
      
    },
    info(item, index, button) {
      this.selectedRowIndex = index;
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateVariants() {
      // This method should get the variants that are changed and POST them to the backend.
      console.log(this.selectedRowIndex)
      console.log(this.variants[this.selectedRowIndex])
      
      // Check to see if currently selected variant is changed (altered class or comment):
      if (this.variants[this.selectedRowIndex].changed === true) {

      const variant = this.variants[this.selectedRowIndex];
      const baseURI = config.$backend_url + "/newpost";
      const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const f = ( this.filtersapplied == true ) ?  this.filters :  "no filters applied"


      this.$http
        .post(
          baseURI,
          { variant: variant,
          user: this.$store.getters.username,
          date: date,
          filters: f},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
        });

      }
    
    
    
    
    },
    setChanged() {
      this.variants[this.selectedRowIndex].changed = true;
    },
  

  },
  computed: {
    ...mapGetters(["filters"]),
  },
  mounted() {
    
  },
};
</script>
