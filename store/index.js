export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user.data;
  },
  stateCategories(state) {
    return state.categories.categories;
  },
  stateUsers(state) {
    return state.users.users;
  },
  stateTransactions(state) {
    return state.transactions.transactions;
  }
};
export const mutations = {
  UPDATE_LOGGED_USER(state, user) {
    if (user.id === state.auth.user.id) {
      state.auth.user.name = user.name;
      state.auth.user.email = user.email;
    }
  },
};
export const strict = process.env.NODE_ENV !== "production";
