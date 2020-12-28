  <template>
  <div>
    <hr>
    <h1>Variants:</h1>
    <p>Show all variants and filters</p>
  <b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-small">Sample comment for sample {{ $route.params.id }}:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-small"
        v-model="sample_comment"
        size="sm"
        placeholder="Comment here: "
      ></b-form-textarea>
    </b-col>
  </b-row>

</b-container>

    <hr />
    <variant-table :variants.sync="variants" />
    <hr />
    <hr>
    <filter-component />

    <p>Her skal det komme en knapp med en redirect til Report</p>
      <button @click="routeReport" type="button" class="btn btn-secondary">
        Go to report
        </button>
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
  data() {
      return {
        sample_comment: "",
        
      }
  },
  methods: {
    routeReport: function() {
      this.$router.push({name: 'Report'})
    }

  },
};
</script>

