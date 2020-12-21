<template>
  <div ref="content">
    <h1>Report</h1>
    <!-- <button @click="download_pdf" type="button" class="btn btn-secondary">
          Download pdf
        </button> -->
    <ul id="example-1" >
    <li v-for="item in variants" :key="item.class" >
        {{ item.chr }}
    </li>
    </ul>




    <ul class="list-group">
      <li class="list-group-item">Dapibus ac facilisis in</li>

      <li class="list-group-item list-group-item-primary">
        A simple primary list group item
      </li>
      <li class="list-group-item list-group-item-secondary">
        A simple secondary list group item
      </li>
      <li class="list-group-item list-group-item-success">
        A simple success list group item
      </li>
      <li class="list-group-item list-group-item-danger">
        A simple danger list group item
      </li>
      <li class="list-group-item list-group-item-warning">
        A simple warning list group item
      </li>
      <li class="list-group-item list-group-item-info">
        A simple info list group item
      </li>
      <li class="list-group-item list-group-item-light">
        A simple light list group item
      </li>
      <li class="list-group-item list-group-item-dark">
        A simple dark list group item
      </li>




    <div class="row">
  <div class="col-4">
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
      <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
    </div>
  </div>
</div>





    </ul>

    {{ variants }}
  </div>
</template>

<script>
// import { config } from '../config.js';
// import jsPDF from 'jspdf';

export default {
  data() {
    return {};
  },
  created: function () {},
  methods: {},

  computed: {
    variants: {
      get() {
        return this.$store.getters.variants;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>

