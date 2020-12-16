import axios from 'axios';

const state = {
	logStatus: false
};

const getters = {
	logStatus: (state) => state.logStatus
};

const actions = {
	initStore: ({ commit }) => {
		axios.get('https://172.16.0.3:5001/chklogin', { withCredentials: true }).then((response) => {
			console.log(response.data);
			// if response is string of true or false, return. Else return false and send something to the console.
			commit('SET_STORE', Boolean(response.data.loginstatus));
		});
	}
};

const mutations = {
	SET_STATUS(state, status) {
		state.logStatus = status;
	}
};

export default {
	name: 'userstatus',
	state,
	getters,
	actions,
	mutations
};
