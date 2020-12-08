<template>
  <div id="app">
    <simple-component/>
  </div>
</template>

<script>
import SimpleComponent from './components/SimpleComponent.vue';

export default {
  name: 'App',
  components: {
    SimpleComponent
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
