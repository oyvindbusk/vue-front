import axios from 'axios';

const state = {
	products: {}
};

const getters = {
	products: (state) => state.products
};

const actions = {
	initStore: ({ commit }) => {
		axios.get('https://jsonplaceholder.typicode.com/todos/1', { withCredentials: true }).then((response) => {
			console.log(response.data);
			commit('SET_STORE', response.data);
		});
	}
};

const mutations = {
	SET_STORE(state, products) {
		state.products = products;
	}
};

export default {
	name: 'samples',
	state,
	getters,
	actions,
	mutations
};
