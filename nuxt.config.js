import { join } from "path";
require("dotenv").config();
const { head } = require("./config")
const { HTTP_ENDPOINT, WS_ENDPOINT } = process.env

export default {
  mode: "spa",
  head,
  // loading: "~/components/ui/Loading.vue",
  css: [],
  plugins: [
    "~/plugins/filters.js",
    { src: "~/plugins/init.js", mode: "client" },
    { src: "~/plugins/lazy.js", mode: "client" },
    { src: "~/plugins/carousel.js", mode: "client" },
    { src: "~/plugins/swal.js", mode: "client" },
    { src: "~/plugins/scroll.js", ssr: false },
    { src: "~/plugins/vue-slider-component", mode: "client" } // Price slider
  ],
  buildModules: ["@nuxtjs/tailwindcss"],
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/dotenv",
    // "~/modules/routes",
    "@nuxtjs/robots",
    "@nuxtjs/proxy",
    "@nuxtjs/font-awesome",
    "@nuxtjs/pwa",
    // "@nuxtjs/onesignal",
    "@nuxtjs/toast",
    "cookie-universal-nuxt"
  ],
  apollo: {
    // errorHandler: "~/apollo/customErrorHandler.js",
    clientConfigs: {
      default: {
        httpEndpoint: "/graphql",
        wsEndpoint: WS_ENDPOINT
      }
    },
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache"
      },
    },
  },
  toast: {
    theme: "bubble",
    position: "top-center",
    singleton: true
  },
  proxy: {
    '/graphql': HTTP_ENDPOINT,
    '/images': HTTP_ENDPOINT
  },
  generate: {
    dir: "dist",
    fallback: true
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, "tailwind.config.js"),
        "postcss-pxtorem": {
          propList: ["*", "!border*"]
        }
      }
    }
  }
};
