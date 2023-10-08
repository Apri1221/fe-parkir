import createSitemapRoutes from "./utils/createSitemap";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // ssr: false, // must, for vt-notification.js
  head: {
    title: "Parking System",
    htmlAttrs: {
      lang: "id",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/kutty@latest/dist/kutty.min.js",
        async: true,
        crossorigin: "anonymous",
      },
    ],
  },
  mode: 'universal',
  manifest: {
    name: "Parkir Nuxt Frontend",
    short_name: "Parkir Nuxt",
    description: "Boilerplate for NuxtJs with Tailwind",
    theme_color: "#2C3E50",
    start_url: "/",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/tailwind-components.js" },
    { src: "~/plugins/vt-notifications.js" },
    { src: "~/plugins/axios.js" },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/moment",
    "@nuxtjs/router",
  ],
  moment: {
    defaultTimezone: "Asia/Phnom_Penh",
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "nuxt-i18n",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxt/image",
  ],
  image: { domains: ["https://demo.dindingdigital.com"] },
  // Nuxt Axios
  axios: {
    baseURL: "https://parkir.dindingdigital.com/api",
    // credentials: false
  },
  // Nuxt Auth Plugin
  auth: {
    redirect: {
      login: "/",
    },
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
        },
        user: {
          property: "",
          autoFetch: false,
        },
        endpoints: {
          login: { url: "login", method: "post" },
          user: { url: "me", method: "get" },
          logout: { url: "logout", method: "get" },
        },
      },
    },
  },
  // Sitemap Config
  sitemap: {
    hostname: process.env.WEB_URL,
    gzip: true,
    routes: createSitemapRoutes,
  },
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en-US.json",
        dir: "ltr",
        moment: "en",
      },
      {
        code: "id",
        iso: "id-ID",
        file: "id-ID.json",
        dir: "ltr",
        moment: "id",
      },
    ],
    defaultLocale: "id",
    lazy: true,
    langDir: "locales/",
    noPrefixDefaultLocale: true,
    vueI18n: {
      fallbackLocale: "id",
      messages: {
        "en-US": require("./locales/en-US"),
        "id-ID": require("./locales/id-ID"),
      },
    },
  },

  toast: {
    position: "top-center",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "epic-spinners", 
      "vt-notifications",
    ],
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  loading: false,
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || "https://parkir.dindingdigital.com",
    nodeEnv: process.env.NODE_ENV || "development",
  },
};
