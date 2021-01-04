<template>
    <div id="app" class="container">
            
      <h1>Filters</h1>
       <b-tabs content-class="mt-3">
        <b-tab title="Regular" active @click="clearfilters()">
          
          <form>
      <div class="filters">
        <div
          class="form-row"
          v-for="(experience, index) in filters.regular"
          :key="index"
        >
          <div class="form-group col-md-3">
            <label>Filter Column</label>
            <b-form-select
              v-model="experience.columns"
              :name="`filters[${index}][operator]`"
              :options="columnoptions"
            ></b-form-select>
          </div>

          <div class="form-group col-md-2">
            <label>Filter operator</label>
            <b-form-select
              v-model="experience.operator"
              :name="`filters[${index}][operator]`"
              :options="filteroptions"
            ></b-form-select>
          </div>

          <div class="form-group col-md-3">
            <label>Filter value</label>
            <input
              v-model="experience.filtervalue"
              :name="`filters[${index}][filtervalue]`"
              type="text"
              class="form-control"
              placeholder="filtervalue"
            />
          </div>
          
          <div class="form-group col-md-1">
            <label>Keep if missing</label>
            <b-form-checkbox
              :name="`filters[${index}][keepmiss]`"
              v-model="experience.keepmiss"
              value="true"
              unchecked-value="false"
            ></b-form-checkbox>
          </div>
        </div>
      </div>
      

      <div class="form-group">
        <b-button-group>
        <button @click="addfilters" type="button" class="btn btn-primary">
          Add filters
        </button>
        <button @click="removefilter" type="button" class="btn btn-primary">
          Remove filters
        </button>
        <button @click="applyfilter" type="button" class="btn btn-primary">
          Apply filters
        </button>
          </b-button-group>
          <br>
        
      
      </div>
      
        {{ filters }}
    </form>
        </b-tab>
        <b-tab title="FilterChains">
          <p>
          Filterchains are filters that are run in combination but with different modes of inheritance. This is so you can specify different frequency cutoffs for AD and AR. In addition, you have the opportunity to specify a tolerance for  a higher freq if a variant is present in say HGMD or clinvar.
          The chain is an object with childs AD & AR and other. The filters defined inside AD or other are apllied as is, and the filters defined within AR is applied as is and then only variants which are either homozygous or there exist other variants on the same gene are RTCIceCandidatePairChangedEvent. The Filter Keys are appended as badges in the table.
          standardFilter are defined in the config.js file and can be used as an example.
          </p>
          <form>
            <div class="form-group col-md-3">
            <label>Filter Chains</label>
            <b-form-select
            v-model="selectedchainfilter"
            :options="Object.keys(filterchains)"
            @change="addchainfilter"
            ></b-form-select>
          </div>
          </form>
          {{selectedchainfilter}}
          {{filterchains[selectedchainfilter]}}
        </b-tab>
    
      </b-tabs>


    </div>
</template>

<script>
import { config } from "../config.js";

export default {
    name: "filtercomponent",
      data() {
    return {
      filteroptions: config.filteroptions,
      columnoptions: config.columnoptions,
      filterchains: config.filterChains,
      selectedchainfilter: "",
    };
  },
  methods: {
    addchainfilter() {
      console.log(this.filterchains[this.selectedchainfilter])
      this.$store.commit("UPDATE_FILTERS", this.filterchains[this.selectedchainfilter]);
    },
    addfilters() {
      this.filters.regular.push({
        filtervalue: "",
        operator: "",
        keepmiss: false,
        columns: ""
      });
      this.$store.commit("UPDATE_FILTERS", this.filters);
    },
    removefilter() {
        this.filters.regular.pop();
        this.$store.commit("UPDATE_FILTERS", this.filters);
    },
    applyfilter() {
        this.$store.commit("UPDATE_FILTERS", this.filters);
    },
    clearfilters() {
      console.log("clearfilters")
      this.$store.dispatch("resetFilters")
      
      

    }
  },
  computed: {
    filters: {
      get() {
        return this.$store.getters.filters
      },
      set(value) {
        this.$store.commit("UPDATE_FILTERS", value);
      },
      
    }
    
  }



}
</script>