import { join } from 'path'
require("dotenv").config();
const { API_URL, head, HOST, HTTP_ENDPOINT, WS_ENDPOINT } = require("./config");
const PROXY = process.env.API_URL || API_URL;

export default {
  mode: "spa",
  head,
  // loading: "~/components/ui/Loading.vue",
  css: [],
  plugins: [
    "~/plugins/filters.js",
    "~/plugins/axios",
    { src: "~/plugins/init.js", mode: "client" },
    { src: "~/plugins/lazy.js", mode: "client" },
    { src: "~/plugins/carousel.js", mode: "client" },
    { src: "~/plugins/swal.js", mode: "client" },
    { src: "~/plugins/scroll.js", ssr: false },
    { src: "~/plugins/vue-slider-component", mode: "client" } // Price slider
  ],
  buildModules: ["@nuxtjs/tailwindcss"],
  modules: [
    '@nuxtjs/apollo',
    "@nuxtjs/dotenv",
    // "~/modules/routes",
    "@nuxtjs/robots",
    "@nuxtjs/axios",
    "@nuxtjs/font-awesome",
    "@nuxtjs/pwa",
    // "@nuxtjs/onesignal",
    "@nuxtjs/toast",
    "cookie-universal-nuxt"
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: '/graphql',
        wsEndpoint: process.env.WS_ENDPOINT
      }
    }
  },
  toast: {
    theme: "bubble",
    position: "top-center",
    singleton: true
  },
  axios: {
    proxy: true,
    credentials: true
  },
  proxy: {
    "/graphql": process.env.HTTP_ENDPOINT,
    "/api/": PROXY,
    "/auth": PROXY,
    "/images": PROXY
  },
  generate: {
    dir: 'dist',
    fallback: true
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: [
            '*',
            '!border*',
          ]
        }
      }
    }
  }
};
