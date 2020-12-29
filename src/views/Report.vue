<template>
  <div >
    
<div>
  <b-jumbotron id="content" :header="'Report for sample ' + $route.params.id" >
    <p>Interpreted by: {{ username }} @{{date}}</p>
    <b-button variant="primary" href="#">Generate Report</b-button>
<br>
<br>
<b-row>
  <b-col>
  
<b-card-group deck>
  <b-card header="Interpreted variants">
    <b-list-group>
      <b-list-group-item v-for="(item, index) in variants" :key="index">
         Pos: Chr{{ item.chr }}:{{ item.pos }}-{{ item.ref }}-{{ item.alt }} HGMD: {{ item.HGMD }}  Comment: {{ item.comment }}  Class: {{ item.class }}

      </b-list-group-item>

    </b-list-group>

    <p class="card-text mt-2">
      This is the comment in the ending of the list
    </p>
  </b-card>
</b-card-group>
</b-col>
<b-col>
  <div>
  <b-card-group deck>
    <b-card
      header="Information"
      header-tag="header"
      footer="Card Footer"
      footer-tag="footer"
      title="Details"
    >
      <b-card-text>There is a total of {{variants.length}} variants in this sample. <br>
      Variants without class set: {{variants.filter(function (variant) {return variant.class === ''}).length}}
      </b-card-text>
    </b-card>


  </b-card-group>
</div>

</b-col>
</b-row>





  </b-jumbotron>

  <b-button class="btn" @click="downloadPDF">Save pdf</b-button>
</div>
    <!-- {{ variants }} -->

    <hr>
    
  </div>
</template>

<script>
// import { config } from '../config.js';
import jsPDF from 'jspdf'
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: this.$store.getters.username,
      
    };
  },
  created: function () {
    // this.$store.dispatch("initUserStore");
  },
  methods: {
    downloadPDF() {
       var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(document.getElementById('content'), {
        callback: function (pdf) {
            pdf.save('a4.pdf');
        }
    });
      



    }
  },

  computed: {
    ...mapGetters(["filters"]),
    date: {get() {return new Date().toJSON().slice(0,10).replace(/-/g,'/')}},
    variants: {
      get() {
        return this.$store.getters.variants;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

