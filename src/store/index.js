const store = {
  state: {
    counter: 0
  },
  getters: {
    counte(state) {
      return state.counter;
    }
  },
  mutations: {
    increment(state) {
      state.counter += 1;
    }
  }
};

export default store;
