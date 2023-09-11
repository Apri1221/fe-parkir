export default {
  // eslint-disable-next-line no-unused-vars
  async fetchCategories({ dispatch, commit, getters, rootGetters }, data) {
    const response = await this.$axios.$get(`/category?page=${data.page}&limit=${data.limit}&search=${data.search}`);
    commit("SET_CATEGORIES", response.data);
  },
};
