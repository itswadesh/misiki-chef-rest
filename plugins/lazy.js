import Vue from "vue";
import vueLazy from "vue-lazyload";

Vue.use(vueLazy, {
  preLoad: 1.3,
  error: "/food-tray.svg",
  loading: "/loading.svg",
  attempt: 1
  // filter: {
  //   progressive(listener, options) {
  //     const isCDN = /qiniudn.com/;
  //     if (isCDN.test(listener.src)) {
  //       listener.el.setAttribute("lazy-progressive", "true");
  //       listener.loading = listener.src + "?imageView2/1/w/10/h/10";
  //     }
  //   },
  //   webp(listener, options) {
  //     if (!options.supportWebp) return;
  //     const isCDN = /qiniudn.com/;
  //     if (isCDN.test(listener.src)) {
  //       listener.src += "?imageView2/2/format/webp";
  //     }
  //   }
  // }
});
