<template>
<div>
<h3>TODOLIST of things to fix:</h3>
<li>Add datatable <span class="badge badge-secondary">Done</span></li>
<li>Add test axios get request <span class="badge badge-secondary">Done</span></li>
<li>Setup vuex <span class="badge badge-secondary">Done</span></li>
<li>Test plot with plotly <span class="badge badge-secondary">Done</span></li>
<li>Test get request CORS against varbrowser <span class="badge badge-secondary">Done</span></li>
<li>Get request into vuex store</li>
<li>Json from request into datatable</li>
<li>Json from request into plotly</li>
<li>Routing to another page</li>
<li>User auth</li>
<li>Make navbar</li>
<li>Adding filter, search, select, sort and export to table</li>
<li>Add open modal on click of table</li>
<br>


<hr/>

  <p>All of your components html goes inside these template tags</p>
        <b-button variant="success" v-on:click="increaseAppCounter()">Add 1</b-button>
        <p></p>
        <b-button variant="success" v-on:click="decreaseAppCounter()">Sub 1</b-button>
        <p>The button above has been clicked {{ appCounter }} times.</p>
        <hr/>
        <b-button variant="success" v-on:click="fetchUsers">Axios</b-button>
        <li v-for="user in users" :key="user.name">
          {{ user.name }}
        </li>
        <p>Test GET request via axios</p>
        <hr/>  

</div>
</template>

<script>

  import { ACTION_APP_INCREMENT, ACTION_APP_DECREMENT } from './../store/app.store'
  export default {
    name: "simple-component",
    computed: {
      appCounter: function() {
        return this.$store.getters.getCounter
      }
    },
    data() {
      return {
        users: [],
      };
    },
    methods: {
        fetchUsers: function () {
          const baseURI = 'https://jsonplaceholder.typicode.com/users'
          this.$http.get(baseURI)
          .then((result) => {
          this.users = result.data
        })
        },
        increaseAppCounter: function() {
          this.$store.dispatch(ACTION_APP_INCREMENT)
        },
        decreaseAppCounter: function() {
          this.$store.dispatch(ACTION_APP_DECREMENT)
        }
    }
  };
</script>
