<template>
  <form class="
        xl:w-1/3
        lg:w-1/2
        bg-gray-100
        rounded-lg
        p-8
        flex flex-col
        w-full
        mt-10
        md:mt-0
      " method="post" @submit.prevent="submit">
    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
      {{ $t("sign_up") }}
    </h2>

    <!-- Jam -->
    <div class="relative mb-4">
      <label for="time" class="leading-7 text-sm text-gray-600">{{
        $t("time")
      }}</label>
      <input id="time" v-model="time" type="time" step="0.1" name="time" :required="true" class="tfd-input" />
    </div>

    <!-- vehicle -->
    <div class="relative mb-4">
      <label for="people" class="leading-7 text-sm text-gray-600">{{
        $t("categories.vehicle")
      }}</label>
      <t-select placeholder="Select an option"
        :options="select.filter(e => e.name.toLowerCase() !== 'orang' && e.name.toLowerCase() != 'people')" variant="demo"
        v-model="vehicle">
      </t-select>

      <p class="text-red-600" v-if="errors.length && errors[0]">
        {{ errors[0] }}
      </p>
    </div>

    <!-- plat no -->
    <div class="relative mb-4">
      <label for="no_vehicle" class="leading-7 text-sm text-gray-600">{{
        $t("no_vehicle")
      }}</label>
      <input id="no_vehicle" v-model="no_vehicle" type="text" name="no_vehicle" :required="true" class="tfd-input" />
      <p class="text-red-600" v-if="errors.length && errors[1]">
        {{ errors[1] }}
      </p>
    </div>

    <!-- Orang -->
    <div class="relative mb-4">
      <label for="people" class="leading-7 text-sm text-gray-600">{{
        $t("people")
      }}</label>
      <input id="people" v-model="people" type="number" name="people" :required="true" class="tfd-input" />

      <p class="text-red-600" v-if="errors.length && errors[2]">
        {{ errors[2] }}
      </p>
    </div>

    <!-- calculation -->
    <h1 class="font-bold text-4xl text-right my-4">{{ convertRupiah(priceVehicle + pricePeople) }}</h1>

    <div class="flex flex-row justify-between space-x-4 mt-10">
      <span @click="clear">
        <ShadowButton text="clear_data" color="bg-tfd" />
      </span>

      <span @click="submit">
        <ShadowButton text="print" :color="(!people || !vehicle || !no_vehicle) ? 'bg-gray-500' : 'bg-green-700'" :disabled="!people || !vehicle || !no_vehicle" />
      </span>
    </div>
  </form>
</template>
<script>
import ShadowButton from "~/components/button/shadow-button";
import toRupiah from '@develoka/angka-rupiah-js';


export default {
  components: { ShadowButton },
  props: ['select', 'print'],
  data() {
    return {
      errors: [],
      time: "",
      people: "",
      vehicle: "",
      no_vehicle: "",
      priceVehicle: 0,
      pricePeople: 0,
    };
  },
  async fetch() {
    this.time = this.$moment().format("HH:mm:ss")
  },
  watch: {
    time: function (val) {
      console.log(val)
    },
    vehicle: function (val) {
      if (this.select && val != "") {
        this.priceVehicle = Number(this.select.find(e => e.id === Number(val)).price);
      }
    },
    people: function (val) {
      if (this.select && val != "") {
        this.pricePeople = Number(
          this.select.find(e => e.name.toLowerCase() === 'orang' || e.name.toLowerCase() === 'people').price * val
        );
      }
    }
  },
  methods: {
    convertRupiah(val) {
      return toRupiah(val, {formal: false})
    },
    async clear() {
      this.time = this.$moment().format("HH:mm:ss");
      this.people = "";
      this.no_vehicle = "";
      this.vehicle = "";
      this.pricePeople = 0;
      this.priceVehicle = 0;
    },
    async submit() {
      this.errors = [];
      if (!this.vehicle) { // index 0
        this.errors.push('Jenis Kendaraan harus di isi!.');
      }
      if (!this.no_vehicle) { // index 1
        this.errors.push('Nomor Kendaraan harus di isi!');
      }
      if (!this.people) { // index 2
        this.errors.push('Jumlah orang harus di isi!');
      }
      if (this.errors.length >= 1) {
        return;
      }

      try {
        let response = await this.$axios.$post(`/transaction/create`, {
          total_amount: this.priceVehicle + this.pricePeople,
          time: this.time,
          details: [
            {
              amount: this.priceVehicle,
              quantity: 1,
              id_category: this.vehicle,
              notes: this.no_vehicle
            },
            {
              amount: this.pricePeople,
              quantity: this.people,
              id_category: this.select.find(e => e.name.toLowerCase() === 'orang' || e.name.toLowerCase() === 'people').id,
              notes: null
            },
          ]
        });

        this.$notify(
          { group: "success", title: "Success", text: "Your data created." },
          3000
        );
        this.print(response);
        this.clear();
      } catch (error) {
        console.log(error)
        this.$notify(
          { group: "error", title: "Uupps!", text: "Failed to submit." },
          3000
        );
      }
    },
  },
};
</script>
  