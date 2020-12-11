import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
//import Vuex from 'vuex'
import store from './store'
// Bootstrap imports
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

// Import config. Can be used like this: this.appConfig.$api_url in any module
import { config } from './config';

Vue.prototype.appConfig = config


// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
