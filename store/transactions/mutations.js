import { updateField } from "vuex-map-fields";

export default {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
  updateField,
};
