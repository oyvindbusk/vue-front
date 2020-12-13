<template>
    <div>
        <h1>Samples:</h1>
        <p>Click a row to start enterpreting that sample:</p>
            <div class="container" id="login">
            <div class="row row justify-content-center">
                <div class="col-md-10">
                    <b-table selectable select-mode="single" @row-selected="rowSelected" striped hover outlined :items="items" :small="small" :fields="fields"></b-table>
                </div>
            </div>
            </div>
         
    </div>
</template>

<script>

export default {
  data() {
        return {
            items: [],
            selectedSample: "",
            fields: [
          {
            key: 'sampleID',
            label: 'Sample ID',
            sortable: true
          },
          {
            key: 'panel',
            sortable: true
          },
        ],
        small: true,
        }
  },
    created: function () {
        this.getSamples()
    },
    methods: { 
        getSamples: function () {
            //this.$store.dispatch('ActionGetLoggedStatus')
            const baseURI = 'http://localhost:5001/newsamples'
            //const baseURI = 'https://jsonplaceholder.typicode.com/todos/1'
            this.$http.get(baseURI, {withCredentials: true})
            .then(response => response.data)
            .then(data => {
                this.items = data.items;
                console.log("test")
            })
        },
        // To get selected items in table - this should be added as a mixin
        rowSelected(items) {
        this.selectedSample = items[0].sampleID
      },
        },
        watch: {
            selectedSample: function (val) {
                console.log(val)
                this.$router.push({name: 'Variants', params: {id: this.selectedSample}})

    }}
    
}
</script>