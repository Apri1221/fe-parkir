<template>
  <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
    <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
      Report
    </h1>

    <div class="my-10"></div>
    
    <div v-if="dataCategories" class="flex grid grid-cols-5 gap-4 mx-4 w-4/5">
      <!-- tanggal -->
      <div class="mb-4">
        <label for="start_date" class="leading-7 text-sm text-gray-600">{{
          $t("start_date")
        }}</label>
        <input id="start_date" v-model="start_date" type="date" name="start_date" :required="true" class="tfd-input" />
      </div>

      <div class="mb-4">
        <label for="end_date" class="leading-7 text-sm text-gray-600">{{
          $t("end_date")
        }}</label>
        <input id="end_date" :disabled="start_date === ''" v-model="end_date" type="date" name="end_date" :min="start_date" :required="true" class="tfd-input" />
      </div>

      <!-- category -->
      <div class="mb-4">
        <label for="people" class="leading-7 text-sm text-gray-600">{{
          $t("categories.vehicle")
        }}</label>
        <t-select placeholder="Select an option"
          :options="selectCategory.filter(e => e.name.toLowerCase() !== 'orang' && e.name.toLowerCase() != 'people')" variant="demo"
          v-model="vehicle"></t-select>
      </div>

      <!-- people -->
      <div class="mb-4">
        <label for="people" class="leading-7 text-sm text-gray-600">{{
          $t("operator")
        }}</label>
        <t-select placeholder="Select an option" 
          :options="selectPeople" variant="demo" 
          v-model="user"></t-select>
      </div>

      <button type="submit" @click.prevent="download">
        <ShadowButton text="download" color="bg-green-700" />
      </button>
      <div class="col-span-4"></div>
      <input type="range" min="1" max="4" v-model="secret" className="range" step="1" />
      
    </div>

    <Table v-if="dataTranscations" 
      :total="dataTranscations.count" 
      :per-page="limit" 
      :title="`${title} ${convertRupiah(dataTranscations.total_transaction)}`" 
      :list-columns="listColumns" 
      :data="dataTranscationsFlatten"
      :set-page="setPage" ></Table>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Table from "~/components/tables/default";
import _ from 'lodash';
import CreateForm from "~/components/Forms/create-form";
import ShadowButton from "~/components/button/shadow-button";
import toRupiah from '@develoka/angka-rupiah-js';

export default {
  layout: "home",
  middleware: "admin",
  components: { Table, CreateForm, ShadowButton },
  data() {
    return {
      secret: 4,
      limit: 25,
      current: 1, // current page
      title: "Total Transaction: ",
      listColumns: ["time", "created_at", "total_amount", "type_vehicle", "no_polisi", "total_people", "operator",],
      search: '',
      vehicle: '',
      user: '',
      start_date: this.$moment().format("YYYY-MM-DD"),
      end_date: this.$moment().format("YYYY-MM-DD")
    };
  },
  async fetch() {
    let data = {
      page: this.current,
      limit: this.limit,
      search: '',
      operator: this.user,
      vehicle: this.vehicle,
      start_date: this.start_date,
      end_date: this.end_date,
    }
    await this.fetchTransactions(data);
    await this.fetchCategories({
      page: 0 // for dropdown
    })
    await this.fetchUsers();
  },
  computed: {
    ...mapGetters({
      dataCategories: "stateCategories",
      dataUsers: "stateUsers",
      dataTranscations: "stateTransactions",
    }),
    selectCategory() {
      return this.dataCategories.data.map(e => ({ ...e, value: e.id, label: e.name }))
    },
    selectPeople() {
      return this.dataUsers.map(e => ({ ...e, value: e.id, label: e.name }))
    },
    dataTranscationsFlatten() {
      return this.dataTranscations.data.map(e => ({
        ...e, 
        data: e.created_at,
        type_vehicle: e.transaction_details.find(items => items.categories.name.toLowerCase() != 'orang' || items.categories.name.toLowerCase() != 'people') ? e.transaction_details.find(items => items.categories.name.toLowerCase() != 'orang' || items.categories.name.toLowerCase() != 'people').categories.name : null,
        total_people: e.transaction_details.find(items => items.categories.name.toLowerCase() === 'orang' || items.categories.name.toLowerCase() === 'people') ? e.transaction_details.find(items => items.categories.name.toLowerCase() === 'orang' || items.categories.name.toLowerCase() === 'people').quantity : null,
        operator: e.operators.name,
        no_polisi: e.transaction_details.find(items => items.categories.name.toLowerCase() != 'orang' || items.categories.name.toLowerCase() != 'people') ? e.transaction_details.find(items => items.categories.name.toLowerCase() != 'orang' || items.categories.name.toLowerCase() != 'people').notes : null,
      }))
    },
  },
  watch: {
    secret: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        vehicle: this.vehicle,
        operator: this.user,
        search: this.search,
        start_date: this.start_date,
        end_date: this.end_date,
        secret: val
      }
      await this.fetchTransactions(data);
    },
    search: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        category: this.vehicle,
        operator: this.user,
        search: val,
        start_date: this.start_date,
        end_date: this.end_date,
      }
      await this.fetchTransactions(data);
    },
    current: async function (val) {
      let data = {
        page: val,
        limit: this.limit,
        category: this.vehicle,
        operator: this.user,
        search: this.search,
        start_date: this.start_date,
        end_date: this.end_date,
      }
      await this.fetchTransactions(data);
    },
    vehicle: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        category: val,
        operator: this.user,
        search: this.search,
        start_date: this.start_date,
        end_date: this.end_date,
      }
      await this.fetchTransactions(data);
    },
    user: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        category: this.vehicle,
        operator: val,
        search: this.search,
        start_date: this.start_date,
        end_date: this.end_date
      }
      await this.fetchTransactions(data);
    },
    start_date: async function (val) {
      if (this.end_date !== '') {
        let data = {
          page: this.current,
          limit: this.limit,
          category: this.vehicle,
          operator: this.user,
          search: this.search,
          start_date: val,
          end_date: this.end_date
        }
        await this.fetchTransactions(data);
      }
    },
    end_date: async function (val) {
      let data = {
        page: this.current,
        limit: this.limit,
        category: this.vehicle,
        operator: this.user,
        search: this.search,
        start_date: this.start_date,
        end_date: val
      }
      await this.fetchTransactions(data);
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchCategories",
      fetchTransactions: "transactions/fetchTransactions",
      fetchUsers: "users/fetchUsers",
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
    async onFinish() {
      let data = {
        page: this.current,
        limit: this.limit,
        search: ''
      }
      await this.fetchTransactions(data);
    },
    convertRupiah(value) {
      return toRupiah(value, {formal: false});
    },
    async download() {
      let data = {
        category: this.vehicle,
        operator: this.user,
        start_date: this.start_date,
        end_date: this.end_date,
        secret: this.secret
      }

      await this.$axios.$post(`/transaction/export`, data, {responseType: 'blob'})
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `transaction-${this.$moment().format("YYYY-MM-DD")}.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }).catch(console.error);
    },
  }
};
</script>
