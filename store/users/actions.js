export default {
  // eslint-disable-next-line no-unused-vars
  async fetchUsers({ dispatch, commit, getters, rootGetters }) {
    const response = await this.$axios.$get("/users?page=1&limit=10");
    commit("SET_USERS", response.data.users);
  },
  // eslint-disable-next-line no-unused-vars
  async newUser({ dispatch, commit, getters, rootGetters }) {
    const user = getters["getNewUser"];
    const response = await this.$axios.$post("/auth/register", {
      name: user.name,
      email: user.email,
      password: user.password,
      passwordConfirmation: user.confirmPassword,
    });
    commit("ADD_USER", response);
  },
  // eslint-disable-next-line no-unused-vars
  async updateUser({ dispatch, commit, getters, rootGetters }, id) {
    const users = getters["getUsers"];
    const user = users.find((item) => {
      return item.id === id;
    });
    const response = await this.$axios.$put(`/users/${id}`, {
      name: user.name,
      email: user.email,
    });
    commit("UPDATE_LOGGED_USER", response, { root: true });
  },
  // eslint-disable-next-line no-unused-vars
  async deleteUser({ dispatch, commit, getters, rootGetters }, id) {
    // eslint-disable-next-line no-unused-vars
    const response = await this.$axios.$delete(`/users/${id}`);
    commit("REMOVE_USER", id);
  },
};
