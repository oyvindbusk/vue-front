<template>
  <div id="app">
    <navbar/>
    <simple-component/>
    <datatable/>
    <plot-component/>
    <hr>
  </div>
</template>

<script>
import SimpleComponent from './components/SimpleComponent.vue';
import Datatable from './components/Datatable.vue';
import PlotComponent from './components/PlotComponent.vue';
// import ReqVar from './components/ReqVar.vue';
import Navbar from './components/Navbar.vue';


export default {
  name: 'App',
  components: {
    SimpleComponent,
    Datatable,
    PlotComponent,
    Navbar
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
