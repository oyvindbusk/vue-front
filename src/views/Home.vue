<template>
    <div>
        <h1>Home</h1>
        <p>Import everything here</p>
        <p>
            Automatically check if logged in, then reroute to login.
        </p>
        <hr>
        <!-- <b-button variant="success" v-on:click="checkLoggedIn">Logged in?</b-button> -->
        <hr>
        <span v-html="loggedInStatus"></span>
        <login v-show="!loggedInStatus"/>
        <hr>
        <h3>TODOLIST:</h3>
        <li>Get request into vuex store</li>
        <li>Json from request into datatable</li>
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
    computed: {
        loggedInStatus: function() {
        return this.$store.getters.getLoggedInStatus
    }
    },
    // mounted () {
    //     this.$store.dispatch('ActionGetLoggedStatus')
    // }
    // methods: {
    //     checkLoggedIn: function () {
    //         //this.$store.dispatch('ActionGetLoggedStatus')
    //         const baseURI = 'http://localhost:5001/chklogin'
    //         this.$http.get(baseURI, {withCredentials: true})
    //             .then((result) => {
    //                 console.log(result.data)
    //                 this.loggedInStatus = Boolean(result.data)
    //             })        
    //         }
        
     
    // }

}
</script>
<style lang="scss" scoped>
</style>