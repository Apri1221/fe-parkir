<template>
  <section class="w-full h-16 flex items-center justify-between">
    <ChangePassword></ChangePassword>
    <div class="block lg:hidden ml-6">
      <button class="
          flex
          p-2
          items-center
          rounded-full
          bg-white
          shadow
          text-gray-500 text-md
        ">
        <svg width="20" height="20" class="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
          </path>
        </svg>
      </button>
    </div>
    <div class="relative flex flex-col justify-end h-full px-3 md:w-full">
      <div class="relative p-1 flex items-center w-full space-x-4 justify-end">
        <button class="
            flex
            items-center
            text-gray-500
            dark:text-white
            text-md
            capitalize
          " @click="showChange">
          change password
        </button>
        <span class="w-1 h-8 rounded-lg bg-gray-200"> </span>
        <a href="#" class="block relative">
          <img alt="profil" :src="'https://avatars.dicebear.com/api/male/' +
            loggedInUser.name +
            '.svg?background=%230000ff'
            " class="mx-auto object-cover rounded-full h-10 w-10" />
        </a>
        <div class="dropdown dropdown-bottom dropdown-end">
          <label tabindex="0" class="flex items-center text-gray-500 dark:text-white text-md">{{ loggedInUser.name
          }}</label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 border rounded-box w-52 mt-4">
            <li><span class="
              w-full
            " @click="logout">
                <span class="text-left">
                  <svg fill="currentColor" height="20" viewBox="0 0 36 36" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z"></path>
                  </svg>
                </span>
                <span class="mx-4 text-sm font-normal"> Logout </span>
              </span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import ChangePassword from "../Forms/change-password";

export default {
  name: "NavBarHome",
  components: { ChangePassword },
  computed: {
    ...mapGetters({
      loggedInUser: "loggedInUser",
    }),
  },
  methods: {
    showChange() {
      this.$modal.show("change-password");
    },
    async logout() {
      await this.$auth.logout();
      window.localStorage.clear();
      await this.$router.refresh();
    },
  },
};
</script>
