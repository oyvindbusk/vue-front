<template>
  <div>
    <h1>IGV</h1>
    <b-container fluid>
      <h6>
          Load: <button type="button" class="btn btn-primary" v-on:click="loadIGV()"> IGV </button>
    </h6>
      <div id="igvDiv">
        
      </div>
    </b-container>

    <hr />
  </div>
</template>

<script>
import { config } from "../config.js";
import igv from "igv";

export default {
  name: "igv-component",
  props: ["selecteditems"],
  components: {},
  data() {
    return {
      signedUrl: "",
      position: "",
      pos: "",
    };
  },
  created: function () {
    this.getBamURL();
  },
  computed: {},

  methods: {
    getBamURL: function () {
      const baseURI = config.$backend_url + "/bam/" + this.$route.params.id;
      this.$http.get(baseURI, { withCredentials: true }).then((response) => {
        var signedUrlTemp = response.data;
        signedUrlTemp["bam"] =
          "http://" +
          signedUrlTemp["bam"].replace(
            /((?:\d+\.){3}\d+)(?=:\d+)/gi,
            window.location.hostname
          );
        signedUrlTemp["bai"] =
          "http://" +
          signedUrlTemp["bai"].replace(
            /((?:\d+\.){3}\d+)(?=:\d+)/gi,
            window.location.hostname
          );
        this.signedUrl = signedUrlTemp;
      });
    },
    loadIGV: function () {
      var igvDiv = document.getElementById("igvDiv");
      var options = {
        genome: "hg19",
        locus: this.selecteditems[0].chr != "undefined" ? this.pos : "chr1",
        tracks: [
          {
            name: this.$route.params.id,
            url: this.signedUrl["bam"],
            indexURL: this.signedUrl["bai"],
            format: "bam",
          },
        ],
      };
      if (igv.browser) {
        console.log("exists");
        //options.locus = this.pos;
        igv.browser.search(options.locus);
      } else {
        igv.createBrowser(igvDiv, options).then(function (browser) {
          igv.browser = browser;
          console.log("Created IGV browser");
        });
      }
    },
  },
  watch: {
    selecteditems: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.pos =  this.selecteditems[0].chr != "undefined" ? this.selecteditems[0].chr +  ":" +  (this.selecteditems[0].pos - 40) + "-" +   (parseInt(this.selecteditems[0]["pos"]) + 40) : "";
      if (igv.browser) {
        this.loadIGV();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

