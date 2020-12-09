<template>
  <div id="app">
    <simple-component/>

    <p>Test adding interactive plot from vue-plotly</p>
    <datatable/>
    <plot-component/>
   
  </div>
</template>

<script>
import SimpleComponent from './components/SimpleComponent.vue';
import Datatable from './components/Datatable.vue';
import PlotComponent from './components/PlotComponent.vue';


export default {
  name: 'App',
  components: {
    SimpleComponent,
    Datatable,
    PlotComponent
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
