import axios from 'axios';
import { config } from '../../config.js';

const state = {
	variants: {},
	sessioncomment: {}
};

const getters = {
	variants: (state) => {
		return state.variants;
	},
	sessioncomment: (state) => {
		return state.sessioncomment;
	}
};

const actions = {
	initVariantStore: ({ commit }, sID) => {
		if (sID !== 'empty') {
			axios.get(config.$backend_url + '/newVariants/' + sID, { withCredentials: true }).then((response) => {
				var variants = response.data.variants;
				var sessioncomment = response.data.sessioncomment;

				variants.forEach((variant, index) => {
					variants[index]['changed'] = false;
					variants[index]['visibility'] = true;
					variants[index]['inheritance'] = '';
				});
				commit('SET_STORE', Object.values(variants));
				commit('SET_STORE_SESSION_COMMENT', String(sessioncomment));
			});
		} else {
			commit('SET_STORE', Object.values({}));
		}
	}
};

const mutations = {
	SET_STORE(state, variants) {
		state.variants = variants;
	},
	SET_STORE_SESSION_COMMENT(state, sessioncomment) {
		state.sessioncomment = sessioncomment;
	}
};

export default {
	name: 'variants',
	state,
	getters,
	actions,
	mutations
};
