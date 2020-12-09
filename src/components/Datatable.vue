<template>
 <div id="app" class="container">
    <h4>Test adding datatable from bootstrap </h4>
  <b-table striped hover outlined :items="items" :small="small" :fields="fields"></b-table>
  <a href="https://medium.com/swlh/vuejs-datatables-the-easy-options-a204600ea53d"> link to datatable tutorial</a>
 </div>
</template>

<script>
 export default {
  name: "datatable",
  // data() {
  //  return {
  //   posts: [
  //    {
  //     userId: 1,
  //     id: 1,
  //     title: "sunt aut facere repellat provident occaecati",
  //    },
  //    {
  //     userId: 1,
  //     id: 2,
  //     title: "qui est esse",
  //    },
  //    {
  //     userId: 1,
  //     id: 3,
  //     title: "ea molestias quasi exercitationem repellat qui",
  //    },
  //   ],
  //  };
  // }
     data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: true
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        small: true,
      }
    }
 }
</script>