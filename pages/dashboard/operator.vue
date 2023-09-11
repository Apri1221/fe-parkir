<template>
  <div class="overflow-auto h-screen pb-24 px-4 md:px-6 lg:m-20">
    <div class="top-0 z-30 bg-white">
      <table class="w-full lg:w-3/4 border">
        <tr>
          <th class="text-2xl font-semibold text-gray-800 dark:text-white border p-2">{{ loggedInUser.institutions.name }}
          </th>
          <th style="text-align: -webkit-center" class="text-2xl border"><img width="42" height="42"
              src="/kab-bogor.png"
              alt=""></th>
          <th style="text-align: -webkit-center" class="text-2xl text-center border"><img width="64" height="64"
              src="/bjs-logo.png"
              alt=""></th>
        </tr>
      </table>
    </div>
    <ParkirForm v-if="dataCategories" :select="dataCategories.data.map(e => ({ ...e, value: e.id, label: e.name }))"
      :print="print" class="lg:m-4" />

    <div class="my-40"></div>
    
    <Invoice v-if="transactions"
      :transactions="transactions"
      :on-finish="onFinish" />
    <!-- v-show="false" -->
  </div>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
import ParkirForm from "~/components/forms/parkir-form";
import Invoice from "~/components/prints"

export default {
  components: { ParkirForm, Invoice },
  layout: "staff",
  middleware: "operator",
  data() {
    return {
      transactions: null,
      errorMsg: "",
      ifError: false,
      isSuccess: false,
    };
  },
  async fetch() {
    let data = {
      page: 0,
      limit: 0,
      search: '',
    }
    await this.fetchCategories(data);
  },
  computed: {
    ...mapGetters({
      loggedInUser: "loggedInUser",
      dataCategories: "stateCategories",
    }),
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchCategories",
    }),
    showAddNew() {
      this.$modal.show("new-user");
    },
    async print(data) {
      this.transactions = data.data.data;
    },
    onFinish() {
      this.transactions = null;
    }
  },
};
</script>
  