<template> 
    <div>
        <b-button variant="success" v-on:click="getFromVarBrowser()"> test {{ vars }} </b-button>
        <br>

    </div>
</template>
<script>
export default {
    name: "req-var",
    data() {
        return {
            vars: {}
        }
    },
    methods: {
        getFromVarBrowser: function () {
        const baseURI = 'http://172.16.0.3:5001/test'
        this.$http.get(baseURI)
        .then((result) => {
        this.vars = JSON.stringify(result.data)
        })
        }
    }
  };
</script>
