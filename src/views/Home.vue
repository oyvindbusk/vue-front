<template>
    <div>
        <h1>Home</h1>
        <span v-show="loggedInStatus">You are already loggin in. Go to <a v-bind:href="samples_URL">samples ready for interpretation. </a></span>
        <login v-show="!loggedInStatus"/>
        <hr>
        <h3>TODOLIST:</h3>
         <li>Embedding igv.js</li>
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

    </div>
</template>

<script>
import Login from '../components/Login.vue';
import { config } from '../config.js';


export default {
    components: {
        Login
    },
    data() {
        return {
            loggedInStatus: "",
            samples_URL: "/samples"
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
      
  
    },
    
}


</script>
<style lang="scss" scoped>
</style>

