import Vue from 'vue';
import Vuex from 'vuex';
// import { config } from '../../config.js';

Vue.use(Vuex);

const getDefaultState = () => {
	return {
		filters: {
			regular: [
				{
					filtervalue: '1',
					operator: 'eq',
					keepmiss: false,
					columns: 'chr'
				}
			]
		}
	};
};

const state = getDefaultState();

const getters = {
	filters: (state) => {
		return state.filters;
	}
};

const actions = {
	UPDATE_STORE({ commit }, filters) {
		commit('UPDATE_FILTERS', { filters });
	},
	resetFilters({ commit }) {
		commit('resetState');
	}
};

const mutations = {
	UPDATE_FILTERS(state, filters) {
		state.filters = filters;
		console.log('Updated filter state');
	},
	resetState(state) {
		Object.assign(state, getDefaultState());
	}
};

export default {
	name: 'filters',
	state,
	getters,
	actions,
	mutations
};
