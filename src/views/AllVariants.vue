<template>
    <div>
       <h1>Variants:</h1>
        <p>Show all variants and filters - across all samples</p>
        <filter-component />
        <hr>
        <button v-if="loading" @click="loadAll" type="button" class="btn btn-primary">Load variants</button>
        <variant-table v-if="!loading" :variants.sync="variants" :loading="loading" :fields="fields" />



    </div>
</template>

<script>
import VariantTable from "../components/VariantTable";
import FilterComponent from "../components/FilterComponent.vue";
import { config } from "../config.js";

export default {
    name: "allvariants",
    components: {
        FilterComponent,
        VariantTable,
    },
    data() {
        return {
            loading: true,
            fields: config.allvartablefields,
            
        }
    },
    created: function() {
        this.$store.dispatch("initVariantStore" , 'empty');
        
        

    },
    methods: {
        loadAll: function () {
            this.$store.dispatch("initVariantStore" , '*');
            return this.$store.getters.variants;
            
        }
        
      
  
    },
    computed: {
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
    }
    },
    watch: {
        countVariants(newCount, oldCount) {
        // This sends the loading-prop when the variants are gotten from the call. Then the table loads
        console.log(newCount + " " + oldCount);
        if (newCount !== 0) {this.loading = false;}
        
        }
    }
    
}


</script>
<style lang="scss" scoped>
</style>

