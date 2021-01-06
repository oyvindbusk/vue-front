<template>
    <div>
        <h1>Home</h1>
        <span v-show="loggedInStatus">You are already loggin in. Go to <a v-bind:href="samples_URL">samples ready for interpretation. </a></span>
        <login v-show="!loggedInStatus"/>
        <hr>
        <h3>TODOLIST:</h3>
         <li>Add sample to the variant query</li>
         <li>Embedding igv.js</li>
         <li>test with example igv.js browser</li>
        <li>Add gene name gnomad and zyg to selectable drop down <span class="badge badge-secondary">Done</span></li>
        <li>Move filter function out of the variantTable view to the helpers.js file</li>
        <li>Make working filter chain example <span class="badge badge-secondary">Done</span></li>
        <li>Clean up the filter function in the helpers.js</li>
        <li>Add box to select filterchains <span class="badge badge-secondary">Done</span></li>
        <li>Select columns to filter on from vartablefields insted of columnoptions (both in config)</li>
        <li>Add filterchains to config-file<span class="badge badge-secondary">Done</span></li>
        <li>Importer en metode fra en mixin</li>
        <li>Json from request into plotly</li>
        <li>Adding search to table</li>
        <li>Adding export to table</li>
        <br>
        <h3>Done:</h3>
        <li>Add a Report view and route <span class="badge badge-secondary">Done</span></li>
        <li>Fix error message because slow load of table<span class="badge badge-secondary">Done</span></li>



<hr>
                    <div id="igvDiv" style="padding-top: 50px;padding-bottom: 20px; height: auto">
                        <h6>Mapping :  <button type="button" class="btn btn-primary" v-on:click="getBamURL();loadIGV()">Load</button></h6>
                        <button type="button" class="btn btn-primary" v-on:click="getBamURL">bamURL</button>
                    </div>
<hr>





    </div>
</template>

<script>
import Login from '../components/Login.vue';
import { config } from '../config.js';
import igv from 'igv'

export default {
    components: {
        Login
    },
    data() {
        return {
            loggedInStatus: "",
            samples_URL: "/samples",
            show: false,
            bamURL: '',
            baiURL: ''
        }
    },
    created: function() {
        this.checkLoggedIn()
        
        

    },
    methods: {
        checkLoggedIn: function () {
            const baseURI = config.$backend_url + '/chklogin'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => response.data)
            .then(data => this.loggedInStatus = data.logstatus)
            console.log(this.appConfig.someOtherProps)
        },
        getBamURL: function() {
            const baseURI = config.$backend_url + '/bam/' + '7_50'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => {
                var signedUrlTemp = response.data
                signedUrlTemp['bam'] = signedUrlTemp['bam'].replace(/((?:\d+\.){3}\d+)(?=:\d+)/gi, window.location.hostname);
                signedUrlTemp['bai'] = signedUrlTemp['bai'].replace(/((?:\d+\.){3}\d+)(?=:\d+)/gi, window.location.hostname);
                this.bamURL = signedUrlTemp['bam']
                this.baiURL = signedUrlTemp['bai']
        

            })


        },
        loadIGV: function() {
            var igvDiv = document.getElementById('igvDiv');
			var options = {
				genome: "hg19",
				locus: "chr1",
				tracks: [
					{
						name: "test",
						url: '172.16.0.3:9000/variants/7_50/bam??response-expires=1970-01-01T00%3A00%3A00Z&AWSAccessKeyId=minioadmin&Expires=1609958808&Signature=7p%2FXoXVBayg8hj2gqylclkg%2BbNQ%3D',
                        indexURL: '172.16.0.3:9000/variants/7_50/bai??response-expires=1970-01-01T00%3A00%3A00Z&AWSAccessKeyId=minioadmin&Expires=1609958808&Signature=pjCffKS6%2FZ%2B6ZN0OXFO4qIcHwEU%3D',
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

