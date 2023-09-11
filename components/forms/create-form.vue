<template>
  <div>
    <t-modal :click-to-close="true" :hide-close-button="true" name="create-form">
      <div class="container w-full mx-auto py-6 md:w-4/5 w-11/12 px-6">
        <div>
          <img alt="profil" :src="'https://avatars.dicebear.com/api/male/' +
            name +
            '.svg?background=%230000ff'
            " class="mx-auto object-cover rounded-full h-20 w-20" />
          <h2 class="mt-6 text-center text-4xl font-bold text-gray-700">
            New Data
          </h2>
        </div>
        <form class="mt-16" method="post" @submit.prevent="submit">
          <t-input v-model="name" classes="mt-4 border-gray-300 placeholder-gray-400 rounded-md" :required="true"
            placeholder="Name" name="name" autocomplete="off" type="text" />
          <t-input v-model="price" classes="mt-4 border-gray-300 placeholder-gray-400 rounded-md" :required="true"
            placeholder="Price" name="price" autocomplete="off" type="number" />
          <div class="mt-10 w-full flex justify-center text-white font-semibold text-sm uppercase rounded-md">
            <button type="submit">
              <ShadowButton text="submit" color="bg-green-700" />
            </button>
          </div>
        </form>
      </div>
    </t-modal>
  </div>
</template>
<script>

import ShadowButton from "~/components/button/shadow-button";

export default {
  name: "CreateForm",
  components: { ShadowButton },
  props: ['onFinish', 'idSelected'],
  data() {
    return {
      errorMsg: "",
      name: "",
      price: 0,
      ifError: false,
      isSuccess: false,
    };
  },
  methods: {
    clear() {
      this.$modal.hide("create-form");
      this.onFinish();
    },
    async submit() {
      try {
        if (this.idSelected) {
          await this.$axios.$put(`/category/update/${this.idSelected}`, {
            name: this.name,
            price: this.price,
          });
        } else {
          await this.$axios.$post(`/category/create`, {
            name: this.name,
            price: this.price,
          });
        }

        this.$notify(
          { group: "success", title: "Success", text: "Your data created!" },
          3000
        );
        this.clear();
      } catch (error) {
        console.log(error)
        this.$notify(
          { group: "error", title: "Uupps!", text: "Failed to store data." },
          3000
        );
      }
    },
  },
};
</script>
