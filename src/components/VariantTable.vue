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
        <b-button size="sm" @click="interp(row.item, row.index, $event.target)" class="mr-1">
         Interp modal
        </b-button>
      </template>

      <!-- <template #row-details="row">
        <b-card>
          <ul text-align:left>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template> -->
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
      <pre>{{ infoModal.content }}</pre>
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
    interp(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = config.testhtml
      // this.infoModal.content = JSON.stringify(item, null, 2) ;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    }
  },
  computed: {},
};
</script>
