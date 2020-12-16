import axios from 'axios';
import { config } from '../../config.js';

const state = {
	variants: {}
};

const getters = {
	variants: (state) => state.variants,

	filtered_variants: (state) => {
		return state.variants.filter((vari) => {
			vari.chr == '1';
		});
	}
};

const actions = {
	initVariantStore: ({ commit }) => {
		axios.get(config.$backend_url + '/newVariants', { withCredentials: true }).then((response) => {
			var variants = response.data.variants;
			variants.forEach((variant, index) => {
				variants[index]['changed'] = false;
			});
			commit('SET_STORE', Object.values(variants));
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
