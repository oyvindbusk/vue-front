<template>
 <div id="app" class="container">
  <b-table striped hover outlined :items="posts"></b-table>
  <p>https://medium.com/swlh/vuejs-datatables-the-easy-options-a204600ea53d</p>
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