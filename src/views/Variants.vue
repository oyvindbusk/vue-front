  <template>
  <div>
    <h1>Variants:</h1>
    <p>Show all variants with filters</p>
    <hr />

    <p>Table comes here</p>
    <variant-table :variants="variants" />
    <hr />
    <p>{{ $route.params.id }}</p>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    <hr />

    <filter-component />
  </div>
</template>

<script>
import FilterComponent from "../components/FilterComponent.vue";
import VariantTable from "../components/VariantTable";


export default {
  name: "variants",
  components: {
    FilterComponent,
    VariantTable,
  },
  computed: {
    variants() {
      return this.$store.getters.variants;
    },
  },
  created: function () {
    this.$store.dispatch("initVariantStore");
  },
  methods: {
    // To get selected items in table
    rowSelected(items) {
      this.selectedItems = items;
    },
  },
};
</script>

