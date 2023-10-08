<template>
  <div>
    <input id="login-modal" type="checkbox" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <form class="modal-box relative bg-gray-100" method="post" @submit.prevent="login">
        <label for="login-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h2 class="text-gray-900 text-xl font-medium title-font mb-5">
          {{ $t("login") }}
        </h2>
        <div class="relative mb-4">
          <label for="login-email" class="leading-7 text-base text-gray-600">{{
            $t("email")
          }}</label>
          <input id="login-email" v-model="email" type="email" name="login-email" :required="true"
            autocomplete="login-email" class="tfd-input" />
        </div>
        <div class="relative mb-4">
          <label for="login-password" class="leading-7 text-base text-gray-600">{{
            $t("password")
          }}</label>
          <input id="login-password" v-model="password" type="password" name="login-password" :required="true"
            class="tfd-input" />
        </div>
        <div class="modal-action justify-center">
          <button type="submit">
            <ShadowButton text="login" color="bg-green-700" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ShadowButton from "~/components/button/shadow-button";
export default {
  components: { ShadowButton },
  data() {
    return {
      logging: false,
      email: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    async login() {
      this.logging = true;
      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        const { user, token } = response.data.data;
        await this.$auth.setUser(user);
        await this.$auth.setUserToken(token, null)
        this.$notify(
          { group: "success", title: "Success", text: "Success to login." },
          5000
        );

        await this.$router.push("/dashboard");
        this.logging = false;
        this.email = "";
        this.password = "";
      } catch (error) {
        this.logging = false;
        this.$notify(
          { group: "error", title: "Uupps!", text: "Failed to login." },
          3000
        );
      }
    },
  },
};
</script>
