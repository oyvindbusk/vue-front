import axios from 'axios';
import { config } from '../../config.js';

const state = {
	variants: {}
};

const getters = {
	variants: (state) => {
		return state.variants;
	}
};

const actions = {
	initVariantStore: ({ commit }, sID) => {
		axios.get(config.$backend_url + '/newVariants/' + sID, { withCredentials: true }).then((response) => {
			var variants = response.data.variants;
			variants.forEach((variant, index) => {
				variants[index]['changed'] = false;
				variants[index]['visibility'] = true;
				variants[index]['inheritance'] = '';
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
