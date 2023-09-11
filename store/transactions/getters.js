import { getField } from "vuex-map-fields";
export default {
  getNewTransaction: (state) => state.newTransaction,
  getCategories: (state) => state.transactions,
  getField,
};
