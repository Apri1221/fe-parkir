<template>
  <div>
    <t-modal :click-to-close="true" :hide-close-button="true" name="new-user">
      <div class="container w-full mx-auto py-6 md:w-4/5 w-11/12 px-6">
        <div>
          <img
            alt="profil"
            src="/bjs-logo.png"
            class="mx-auto object-cover rounded-full h-20 w-20"
          />
          <h2 class="mt-6 text-center text-4xl font-bold text-gray-700">
            New User
          </h2>
        </div>
        <form class="mt-16" method="post" @submit.prevent="submit">
          <t-input
            v-model="name"
            classes="mt-4 border-gray-300 placeholder-gray-400 rounded-md"
            :required="true"
            placeholder="Name"
            name="name"
            autocomplete="off"
            type="text"
          />
          <t-input
            v-model="email"
            classes="mt-4 border-gray-300 placeholder-gray-400 rounded-md"
            :required="true"
            placeholder="Email"
            name="email"
            autocomplete="off"
            type="email"
          />
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
import { createHelpers } from "vuex-map-fields";
import { mapActions, mapMutations } from "vuex";
import ShadowButton from "~/components/button/shadow-button";
const { mapFields } = createHelpers({
  getterType: "users/getField",
  mutationType: "users/updateField",
});
export default {
  name: "NewUser",
  components: { ShadowButton },
  data() {
    return {
      errorMsg: "",
      ifError: false,
      isSuccess: false,
    };
  },
  computed: {
    ...mapFields({
      name: "newUser.name",
      email: "newUser.email",
      password: "newUser.password",
      confirmPassword: "newUser.confirmPassword",
    }),
  },
  methods: {
    ...mapActions({
      newUser: "users/newUser",
    }),
    ...mapMutations({
      clearForm: "users/CLEAR_USER_FORM",
    }),
    clear() {
      this.clearForm();
      this.$modal.hide("new-user");
    },
    async submit() {
      try {
        await this.$axios.$post(`/attempt`, {
          email: this.email,
          name: this.name,
        });
        
        this.$notify(
          { group: "success", title: "Success", text: "Your account was registered! Check email." },
          3000
        );
        this.clear();
      } catch (error) {
        this.$notify(
          { group: "error", title: "Uupps!", text: "Failed to register." },
          3000
        );
      }
    },
  },
};
</script>
