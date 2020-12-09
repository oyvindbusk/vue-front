<template>
  <div>
    <Plotly v-if="loaded" :data="data" :layout="layout" :display-mode-bar="false" />
  </div>
</template>
<script>
import { Plotly } from 'vue-plotly'

export default {
    name: "plot-component",
    components: { Plotly },
    data() {
        return {
            loaded: true, 
            data:[{
                x: [1,2,3,4],
                y: [10,15,13,17],
                type:"scatter"}],
                layout: {
                title: "Testing to plot",
                autosize: false, 
                width:750
            }
        }
    }
}
</script>