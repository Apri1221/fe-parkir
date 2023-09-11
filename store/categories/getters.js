import { getField } from "vuex-map-fields";
export default {
  getNewCategory: (state) => state.newCategory,
  getCategories: (state) => state.categories,
  getField,
};
