<template>
  <form class="
      lg:w-2/6
      md:w-1/2
      bg-gray-100
      rounded-lg
      p-8
      flex flex-col
      md:ml-auto
      w-full
      mt-10
      md:mt-0
    " method="post" @submit.prevent="submit">
    <h2 class="text-gray-900 text-xl font-medium title-font mb-5">
      {{ $t("sign_up") }}
    </h2>

    <!-- Name -->
    <div class="relative mb-4">
      <label for="name" class="leading-7 text-base text-gray-600">{{
        $t("name")
      }}</label>
      <input id="name" v-model="name" type="text" name="name" :required="true" class="tfd-input" />
    </div>
    
    <!-- Email -->
    <div class="relative mb-4">
      <label for="email" class="leading-7 text-base text-gray-600">{{
        $t("email")
      }}</label>
      <input id="email" v-model="email" type="email" name="email" :required="true" class="tfd-input" />
    </div>
    
    <div class="flex flex-row justify-center space-x-4">
      <button type="submit">
        <ShadowButton text="sign_up" color="bg-tfd" />
      </button>
    </div>
  </form>
</template>
<script>
import ShadowButton from "~/components/button/shadow-button";
export default {
  components: { ShadowButton },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    clear() {
      this.name = "";
      this.email = "";
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
