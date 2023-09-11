<template>
  <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
    <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
      Document
    </h1>

    <div class="my-10"></div>
    <CreateForm :on-finish="onFinish" :id-selected="idSelected"/>

    <Table v-if="dataCategories" 
      :total.sync="dataCategories.count" 
      :per-page="limit" 
      :title.sync="title" 
      :list-columns.sync="listColumns" 
      :data.sync="dataCategories.data"
      :set-page.sync="setPage" 
      :set-search="setSearch"
      :set-modal="showAddNew"
      :edit-row="setSelected"></Table>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Table from "~/components/tables/default";
import _ from 'lodash';
import CreateForm from "~/components/Forms/create-form";

export default {
  layout: "home",
  middleware: "admin",
  components: { Table, CreateForm },
  data() {
    return {
      limit: 5,
      current: 1, // current page
      title: "Master Category",
      listColumns: ["name", "price", "created_at", "updated_at"],
      search: '',
      idSelected: null
    };
  },
  async fetch() {
    let data = {
      page: this.current,
      limit: this.limit,
      search: ''
    }
    await this.fetchCategories(data);
  },
  computed: {
    ...mapGetters({
      dataCategories: "stateCategories",
    }),
  },
  watch: {
    search: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        search: val
      }
      await this.fetchCategories(data);
    },
    current: async function (val) {
      console.log("ooo", val)
      // let data = {
      //   page: val,
      //   limit: this.limit,
      //   search: this.search
      // }
      // await this.fetchCategories(data);
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchCategories",
    }),
    setPage(page) {
      this.current = page;
    },
    setSearch: _.debounce(function (search) {
      this.search = search
    }, 250),
    showAddNew() {
      this.$modal.show("create-form");
    },
    setSelected(index) {
      this.idSelected = this.dataCategories.data[index].id;
      this.showAddNew()
    },
    async onFinish() {
      let data = {
        page: this.current,
        limit: this.limit,
        search: ''
      }
      await this.fetchCategories(data);
    }
  }
};
</script>
