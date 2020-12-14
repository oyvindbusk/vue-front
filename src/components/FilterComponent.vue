<template>
    <div id="app">
            <form>
      <h1>Filters</h1>
      <div class="filters">
        <div
          class="form-row"
          v-for="(experience, index) in filters"
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
        <button @click="addfilters" type="button" class="btn btn-secondary">
          Add filters
        </button>
        <p></p>
        <button @click="removefilter" type="button" class="btn btn-secondary">
          Remove filters
        </button>
      </div>
        {{ filters }}
      <hr />
    </form>









    </div>
</template>

<script>
import { config } from "../config.js";
export default {
    name: "filtercomponent",
      data() {
    return {
      filters: [
        {
          filtervalue: "",
          operator: "",
          keepmiss: false,
          columns: ""
        },
      ],
      filteroptions: config.filteroptions,
      columnoptions: config.columnoptions,
    };
  },
  methods: {
    addfilters() {
      this.filters.push({
        filtervalue: "",
        operator: "",
        keepmiss: false,
        columns: ""
      });
    },
    removefilter() {
        this.filters.pop();

    },
    submit() {
      const data = {
        filters: this.filters,
      };
      alert(JSON.stringify(data, null, 2));
    },
  },



}
</script>