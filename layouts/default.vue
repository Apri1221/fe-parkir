<template>
  <main class="
      dark:bg-gray-800
      font-sans
      bg-white
      relative
      h-screen
      overflow-auto overflow-y-scroll
    ">
    <NavBar />
    <nuxt />
    <Toast />
  </main>
</template>
<script>
import NavBar from "~/components/NavBar/nav-bar";
import Toast from "~/components/notifications/toasts";

export default {
  components: { NavBar, Toast },
};
</script>
