export default {
  // eslint-disable-next-line no-unused-vars
  async fetchTransactions({ dispatch, commit, getters, rootGetters }, data) {
    const { page, limit, search, operator = '', start_date = '', end_date = '', category = '', secret = null, } = data;
    const response = await this.$axios.$post(`/transaction?page=${page}&limit=${limit}&search=${search}`,
    {
      operator: operator,
      category: category,
      start_date: start_date,
      end_date: end_date,
      secret: secret
    });
    commit("SET_TRANSACTIONS", response.data);
  },
};
