  <template>
  <div>
    <hr />
    <h1>Variants:</h1>
  
    <p>Show all variants and filters</p>
    
    
    <sess-comm-component :sessioncomment.sync="sessioncomment" :loading="loading" />
      <button @click="signOff" type="button" class="btn btn-secondary">
     Sign off sample
    </button>
    
    <hr />
    <filter-component />

    <hr />
    <igv-component v-if="selecteditems" :selecteditems="selecteditems"/>
    <variant-table :variants.sync="variants" :loading="loading" :fields="fields" :selecteditems.sync="selecteditems" />

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
import IgvComponent from "../components/IgvComponent";
import SessCommComponent from "../components/SessioncommComponent";

import { config } from "../config.js";



export default {
  name: "variants",
  components: {
    FilterComponent,
    VariantTable,
    IgvComponent,
    SessCommComponent,
    
  },
  computed: {
    // Two way data binding between parent and child component
    sessioncomment: {
      get() {
        return this.$store.getters.sessioncomment;
      },
      set(value) {
        this.$store.commit("SET_STORE_SESSION_COMMENT", value);
      }
    },
 
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
      loading: true,
      selecteditems: {}
    };
  },
  methods: {
    signOff: function(){
      console.log("signoff")
      // Should send a post to fill in sessions.signoffdate
    },
    routeReport: function () {
      this.$router.push({ name: "Report" });
    },
    setChanged() {
      this.variants[this.selectedRowIndex].changed = true;
    },
  },
};
</script>

