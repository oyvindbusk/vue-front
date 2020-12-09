<template>
<div>
  <p>All of your components html goes inside these template tags</p>
        <b-button variant="success" v-on:click="increaseAppCounter()">Add 1</b-button>
        <p></p>
        <b-button variant="success" v-on:click="decreaseAppCounter()">Sub 1</b-button>
        <p>The button above has been clicked {{ appCounter }} times.</p>
        <b-button variant="success" v-on:click="fetchUsers">Axios</b-button>
        <li v-for="user in users" :key="user.name">
          {{ user.name }}
        </li>
        <p>Test GET request via axios</p>


        <p>Test adding datatable from </p>
        

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
