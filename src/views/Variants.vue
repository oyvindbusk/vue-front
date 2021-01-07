  <template>
  <div>
    <hr />
    <h1>Variants:</h1>
    <p>Show all variants and filters</p>
    <b-container fluid>
      <b-row>
        <b-col sm="2">
          <label for="textarea-small"
            >Sample comment for sample {{ $route.params.id }}:</label
          >
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
    <filter-component />


    <hr />
    <variant-table :variants.sync="variants" :loading="loading" :fields="fields" />

   <br>
    <hr />
    <button @click="routeReport" type="button" class="btn btn-secondary">
      Go to report
    </button>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import FilterComponent from "../components/FilterComponent.vue";
import VariantTable from "../components/VariantTable";
import { config } from "../config.js";
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
    countVariants() {
      return this.variants.length;
    },
  },
  watch: {
    countVariants(newCount, oldCount) {
      // This sends the loading-prop when the variants are gotten from the call. Then the table loads
      console.log(newCount + " " + oldCount);
      this.loading = false;
    },
  },
  created: function () {
  
    this.$store.dispatch("initVariantStore" , this.$route.params.id);
    
  },
  data() {
    return {
      fields: config.vartablefields,
      sample_comment: "",
      loading: true,
    };
  },
  methods: {
    routeReport: function () {
      this.$router.push({ name: "Report" });
    },
  },
};
</script>

