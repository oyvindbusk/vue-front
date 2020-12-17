import Vue from 'vue'
import Vuex from 'vuex'
import app from './store'
import samples from './modules/samples'
import variants from './modules/variants'
import filters from './modules/filters'

Vue.use(Vuex)

export const store  = new Vuex.Store({
    debug: false,
    modules: {
        app,
        samples,
        variants,
        filters
    }
})

export default store
