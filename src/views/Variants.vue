  <template>
  <div>
    <h1>Variants:</h1>
    <p>Show all variants and filters</p>
    <hr />
    <p>Variants:</p>
    <variant-table :variants.sync="variants" />
    <hr />
    <p>{{ $route.params.id }}</p>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

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
    // Two way data binding between parent and child component
    variants: {
      get() {
        return this.$store.getters.variants;
      },
      set(value) {
        this.$store.commit("SET_STORE", value);
      },
    },
  },
  created: function () {
    this.$store.dispatch("initVariantStore");
  },
  methods: {},
};
</script>

