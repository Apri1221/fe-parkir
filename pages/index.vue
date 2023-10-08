<template>
  <div class="flex relative h-screen items-center bg-main bg-cover">
    <LoginModal />
    <div class="w-1/2 shadow-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-60 backdrop-blur-md mt-20 py-10 px-8 rounded-xl">
      <div class="container px-5 py-12 mx-auto flex flex-wrap items-center">
        <!-- <div class="lg:w-3/5 md:w-1/2  md:pr-16 lg:pr-0 pr-0"> -->
          <div class="w-full md:pr-16 lg:pr-0 pr-0">
          <img src="/tfd-logo.webp" class="w-20 mx-auto mb-12" />
          <p
            class="
              max-w-3xl
              text-xl
              md:text-md
              mx-auto
              dark:text-white
              text-gray-800
              py-2
              text-left
              leading-loose
            "
            v-html="$t('tfd_mission')"
          ></p>
        </div>
        <!-- <Registration /> -->
      </div>
    </div>
    
  </div>
</template>

<script>
import LoginModal from "~/components/forms/login-modal";
import Registration from "~/components/forms/registration";
export default {
  components: { Registration, LoginModal },
  middleware: "guest",
};
</script>
