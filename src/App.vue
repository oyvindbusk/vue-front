<template>
    <div id="app">
        <navbar/>
        <router-view />
        <!-- <simple-component/>
        <hr>
        <p>Test her:</p>
        
            <router-link to="/profile">Profile</router-link>
        
        
        <p>Ferdig</p>
        <hr>
        <datatable/>
        <plot-component/>
        <hr>
        <filter-component/>
        <hr>
        <br>
        <login/>
        <br>
        <br>
        <br>
        <br> -->
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
// import SimpleComponent from './components/SimpleComponent.vue';
// import Datatable from './components/Datatable.vue';
// import PlotComponent from './components/PlotComponent.vue';
// import FilterComponent from './components/FilterComponent.vue';
// import Login from './components/Login.vue';




export default {
    name: 'App',
    components: {
        Navbar
        // SimpleComponent,
        // Datatable,
        // PlotComponent,
        // FilterComponent,
        // Login
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
