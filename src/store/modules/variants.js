import axios from 'axios';
import { config } from '../../config.js';

const state = {
	variants: {}
};

const getters = {
	variants: (state) => state.variants
};

const actions = {
	initVariantStore: ({ commit }) => {
		axios.get(config.$backend_url + '/newVariants', { withCredentials: true }).then((response) => {
			commit('SET_STORE', Object.values(response.data.variants));
		});
	}
};

const mutations = {
	SET_STORE(state, variants) {
		state.variants = variants;
	}
};

export default {
	name: 'variants',
	state,
	getters,
	actions,
	mutations
};
