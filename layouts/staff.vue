<template>
    <main class="
        dark:bg-gray-800
        font-sans
        bg-white
        relative
        h-screen
        overflow-auto overflow-y-scroll
      ">
      <div class="flex flex-col w-full md:space-y-4">
        <NavBarHome></NavBarHome>
        <nuxt></nuxt>
      </div>
      <Toast />
    </main>
  </template>
  <script>
  import NavBar from "~/components/NavBar/nav-bar";
  import Toast from "~/components/notifications/toasts";
  import NavBarHome from "../components/NavBar/nav-bar-home";
  
  export default {
    components: { NavBar, Toast, NavBarHome },
  };
  </script>
  