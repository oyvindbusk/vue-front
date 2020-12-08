import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
//import Vuex from 'vuex'
import store from './store'
// Bootstrap imports
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)

// Install vuex
//Vue.use(Vuex)

// Install axios
// Vue.use(axios)
Vue.prototype.$http = axios



new Vue({
  render: h => h(App),
  store
}).$mount('#app')
