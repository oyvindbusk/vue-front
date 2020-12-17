import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
	filters:  [
        {
          filtervalue: "1",
          operator: "eq",
          keepmiss: false,
          columns: "chr"
        },
      ]
};

const getters = {
	filters: (state) => {
		return state.filters
	},
	
};

const actions = {
        UPDATE_STORE({commit}, filters ) {
            commit('UPDATE_FILTERS', { filters })
        }
	
};

const mutations = {
	UPDATE_FILTERS(state, filters) {
        state.filters = filters;
        console.log("Updated filter state")
	}
};

export default {
	name: 'filters',
	state,
	getters,
	actions,
	mutations
};



