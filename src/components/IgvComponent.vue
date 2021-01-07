<template>
    <div>
        <h1>IGV</h1>
<b-container fluid>
                <div id="igvDiv" >
                        <h6>Load:  <button type="button" class="btn btn-primary" v-on:click="getBamURL();loadIGV()">IGV</button></h6>
                </div>
                <hr>
</b-container>



    </div>
</template>

<script>

import { config } from "../config.js";
import igv from 'igv'

export default {
    name: "igv-component",
    components: {
        
    },
    data() {
        return {
            signedURL: {},
           
        }
    },
    created: function() {
       
        
        

    },
    computed: {
 
    },
    methods: {
            getBamURL: function() {
            const baseURI = config.$backend_url + '/bam/' + this.$route.params.id
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => {
                var signedUrlTemp = response.data
                signedUrlTemp['bam'] = signedUrlTemp['bam'].replace(/((?:\d+\.){3}\d+)(?=:\d+)/gi, window.location.hostname);
                signedUrlTemp['bai'] = signedUrlTemp['bai'].replace(/((?:\d+\.){3}\d+)(?=:\d+)/gi, window.location.hostname);
                this.signedURL = signedUrlTemp
                })


    },
        loadIGV: function() {
            var igvDiv = document.getElementById('igvDiv');
			var options = {
				genome: "hg19",
				locus: "chr1",
				tracks: [
					{
						name: this.$route.params.id,
						url: String(this.signedURL['bam']),
                        indexURL: String(this.signedURL['bai']),
                        format: "bam"
					}
				]
			};
			if (igv.browser) {
				console.log('exists');
				//options.locus = this.pos;
				igv.browser.search(options.locus);
			} else {
				igv.createBrowser(igvDiv, options).then(function(browser) {
					igv.browser = browser;
					console.log('Created IGV browser');
				});
			}
		}
     
     
      
  
    },
    
}


</script>
<style lang="scss" scoped>
</style>

