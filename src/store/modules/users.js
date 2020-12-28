import { config } from '../../config.js';
import axios from 'axios';

const state = {
	username: false
};

const getters = {
	username: (state) => state.username
};

const actions = {
	initUserStore: ({ commit }) => {
		const baseURI = config.$backend_url + '/newuser';
		axios.get(baseURI, { withCredentials: true }).then((response) => {
			console.log(response.data);
			commit('SET_USER', response.data);
		});
	}
};

const mutations = {
	SET_USER(state, username) {
		state.username = username;
	}
};

export default {
	name: 'users',
	state,
	getters,
	actions,
	mutations
};
