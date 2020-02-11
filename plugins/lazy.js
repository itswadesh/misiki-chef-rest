import Vue from "vue";
import vueLazy from "vue-lazyload";

Vue.use(vueLazy, {
  observer: true,
  preLoad: 1.3,
  error: "/food-tray.svg",
  loading: "/loading.svg",
  attempt: 1,
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      const CDN = `https://ik.imagekit.io/misiki/images`;
      src = CDN + src;
    }
  },
  filter: {
    progressive(listener, options) {
      const CDN = `https://ik.imagekit.io/misiki/images`;
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = listener.src + "?tr=w-3,h-2";
    },
    error(listender, Init) {}
  }
});
