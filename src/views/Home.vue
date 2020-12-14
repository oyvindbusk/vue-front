<template>
    <div>
        <h1>Home</h1>
        <p>Import everything here</p>
        <p>
            Automatically check if logged in, then reroute to login.<br>
            This site should check if logged in on site load, and only show login options if not logged in. <br>
            When logged in a table with the samples available for interp should be shown.
        </p>
        <br><br><br><br><br><br><br>
        <hr>
        <p>Code routing: method section -> this.$router.push({name: nameofroute, })</p>
        <b-button variant="success" v-on:click="checkLoggedIn">Logged in?</b-button>
        <hr>
        <span v-html="loggedInStatus"></span>
        <login v-show="!loggedInStatus"/>
        <hr>
        <hr>
        
        <hr>
        <!-- <b-button variant="success" v-on:click="getVariants">Variants</b-button>
        <h1>{{variants}}</h1> -->
        <hr>
        <h3>TODOLIST:</h3>
        <li>Get request into vuex store <span class="badge badge-secondary">Done</span></li>
        <li>Json from request into datatable</li>
        <li>Importer en metode fra en mixin</li>
        <li>Lag og test ett filter</li>
        <li>Json from request into plotly</li>
        <li>Adding filter, search, select, sort and export to table</li>
        <li>Add open modal on click of table</li>
        <br>
        <h3>Done:</h3>
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

export default {
    components: {
        Login
    },
    data() {
        return {
            loggedInStatus: "",
        //     items: [],
        //     selectedItems: [],
        //     samples: "",
        //     fields: [
        //   {
        //     key: 'sampleID',
        //     label: 'Sample ID',
        //     sortable: true
        //   },
        //   {
        //     key: 'panel',
        //     sortable: true
        //   },
        // ],
        // small: true,
        }
    },
    created: function() {
        // this.$store.dispatch('initStore'),
        // this.getSamples()
    },
    methods: {
        checkLoggedIn: function () {
            //this.$store.dispatch('ActionGetLoggedStatus')
            const baseURI = 'http://localhost:5001/chklogin'
            //const baseURI = 'https://jsonplaceholder.typicode.com/todos/1'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => response.data)
            .then(data => this.loggedInStatus = data.logstatus)
            console.log(this.appConfig.someOtherProps)
            },
        getSamples: function () {
            //this.$store.dispatch('ActionGetLoggedStatus')
            const baseURI = 'http://localhost:5001/newsamples'
            //const baseURI = 'https://jsonplaceholder.typicode.com/todos/1'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => response.data)
            .then(data => this.items = data.items)
        },
        getVariants: function () {
            //this.$store.dispatch('ActionGetLoggedStatus')
            const baseURI = 'http://localhost:5001/newVariants'
            //const baseURI = 'https://jsonplaceholder.typicode.com/todos/1'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => response.data)
            .then(data => this.samples = data)
        },
  
    },
    
}



</script>
<style lang="scss" scoped>
</style>

