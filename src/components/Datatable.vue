<template>
 <div id="app" class="container">
    <h4>Test adding datatable from bootstrap </h4>
  <b-table striped hover outlined :items="posts"></b-table>
  <a href="https://medium.com/swlh/vuejs-datatables-the-easy-options-a204600ea53d"> link to datatable tutorial</a>
 </div>
</template>

<script>
 export default {
  name: "datatable",
  data() {
   return {
    posts: [
     {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati",
     },
     {
      userId: 1,
      id: 2,
      title: "qui est esse",
     },
     {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui",
     },
    ],
   };
  }
 }
</script>