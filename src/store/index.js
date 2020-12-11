import Vue from 'vue'
import Vuex from 'vuex'
import app from './store'
import samples from './modules/samples'

Vue.use(Vuex)

export const store  = new Vuex.Store({
    debug: false,
    modules: {
        app,
        samples
    }
})

export default store