// define app store actions names
export const ACTION_APP_INCREMENT = 'ActionAppIncrement'
export const ACTION_APP_DECREMENT = 'ActionAppDecrement'


// define app store mutations names
const INCREMENT_VALUE = 'IncrementValue'
const DECREMENT_VALUE = 'DecrementValue'

// initial app state
const state = {
  counter: 0,
  loggedInStatus: false
}

const getters = {
  getCounter (state) {
    return state.counter
  },
  getLoggedInStatus (state) {
    return state.loggedInStatus
  }
}

// app store actions
const actions = {
  [ACTION_APP_INCREMENT] (context) {
    context.commit(INCREMENT_VALUE);
  },
  [ACTION_APP_DECREMENT] (context) {
    context.commit(DECREMENT_VALUE);
  },
  ActionGetLoggedStatus({ commit }) {
    const baseURI = 'http//localhost:5001/chklogin'
    this.$http.get(baseURI, {withCredentials: true})
    .then(result => {
      commit('SET_LOGGED', Boolean(result.data))
    })    
  }
}

// app store mutations
const mutations = {
  [INCREMENT_VALUE] (state) {
    state.counter = state.counter + 1
    console.log('New counter value: '+ state.counter)
  },
  [DECREMENT_VALUE] (state) {
    state.counter = state.counter -1
    console.log('New counter value: '+ state.counter)
  },
    SET_LOGGED (state, loggedInStatus) {
    state.loggedInStatus = loggedInStatus
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}