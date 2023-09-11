import { updateField } from "vuex-map-fields";

export default {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  updateField,
};
