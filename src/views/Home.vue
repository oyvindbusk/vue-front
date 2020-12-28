<template>
    <div>
        <h1>Home</h1>
        <span v-show="loggedInStatus">You are already loggin in. Go to <a v-bind:href="samples_URL">samples ready for interpretation. </a></span>
        <login v-show="!loggedInStatus"/>
        <hr>
        <h3>TODOLIST:</h3>
        <li>Importer en metode fra en mixin</li>
        <li>Json from request into plotly</li>
        <li>Add a Report view and route <span class="badge badge-secondary">Done</span></li>
        <li>Adding search to table</li>
        <li>Adding export to table</li>
        <br>
        <h3>Done:</h3>
        <li>watch en vuex-komponent fra en annen komponent <span class="badge badge-secondary">Done</span></li>
        <li>Importer en funksjon fra en js-fil <span class="badge badge-secondary">Done</span></li>
        <li>Adding select to table <span class="badge badge-secondary">Done</span></li>
        <li>Adding sort to table <span class="badge badge-secondary">Done</span></li>
        <li>Adding export to table<span class="badge badge-secondary">Done</span></li>
        <li>Add open modal on click of table <span class="badge badge-secondary">Done</span></li>
        <li>Lag og test ett filter <span class="badge badge-secondary">Done</span></li>
        <li>Get request into vuex store <span class="badge badge-secondary">Done</span></li>
        <li>Json from request into datatable <span class="badge badge-secondary">Done</span></li>
        <li>Add datatable <span class="badge badge-secondary">Done</span></li>
        <li>Add test axios get request <span class="badge badge-secondary">Done</span></li>
        <li>Setup vuex <span class="badge badge-secondary">Done</span></li>
        <li>Test plot with plotly <span class="badge badge-secondary">Done</span></li>
        <li>Test get request CORS against varbrowser <span class="badge badge-secondary">Done</span></li>
        <li>Routing to another page <span class="badge badge-secondary">Done</span></li>
        <li>User auth <span class="badge badge-secondary">Done</span></li>
        <li>Make navbar <span class="badge badge-secondary">Done</span></li>
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
      
        // getVariants: function () {
        //     //this.$store.dispatch('ActionGetLoggedStatus')
        //     const baseURI = config.$backend_url +'/newVariants'
        //     // const baseURI = 'http://localhost:5001/newVariants'
            
        //     this.$http.get(baseURI, {withCredentials: true})
        //     .then(response => response.data)
        //     .then(data => this.samples = data)
        // },
  
    },
    
}


</script>
<style lang="scss" scoped>
</style>

