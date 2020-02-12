<template>
  <div class="flex justify-between pt-5 pb-5 border-b border-gray-300">
    <div class="w-1/2 lg:w-1/3">
      <div>
        <img
          class="lg:rounded xs:rounded-b-none w-64"
          v-lazy="$store.state.settings.CDN_URL+item.img"
          alt
        />
      </div>
    </div>
    <div class="lg:w-4/5 right-0 xs:9/12">
      <div class="pl-4 font-hairline">
        <p class="text-black mb-2">
          <nuxt-link :to="`/${item.slug}?id=${item._id}`">{{item.name | truncate(30)}}</nuxt-link>
        </p>
        <div class="flex">
          <span class="inline-block rounded-full bg-gray-300 h-2 w-2 m-2"></span>
          <span style="color: rgb(237, 113, 0);" v-if="item.stock<5">{{item.stock}} left</span>
        </div>
        <p class="relative mb-2">
          <span class="text-black font-bold mb-2 text-2xl">{{item.price | currency}}</span>
          <span
            class="text-gray-400 line-through ml-2 text-xs lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
          >{{item.mrp | currency}}</span>
          <span
            class="ml-2 text-green-400 text-xs lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
          >{{calculateOffPercent(item.mrp, item.price)}}% off</span>
        </p>
        <div class="justify-between text-sm">
          <div class="flex flex-wrap">
            <div class="w-full lg:w-3/5 my-2">
              <CartButtons :product="item" />
            </div>
            <div class="w-full lg:w-2/5 text-right my-2">
              <div class="flex text-xs">
                <button
                  class="mr-1 focus:outline-none primary rounded p-1"
                  @click="saveForLater(item)"
                >MOVE TO WISHLIST</button>
                <button
                  class="ml-3 muted rounded py-2 px-3"
                  @click="checkAndAddToCart({pid: item._id, qty: -10000})"
                  :disabled="loading"
                >
                  <img src="/loading.svg" class="w-3 h-3 rotateOutDownLeft" v-if="loading" alt />
                  <i class="fa fa-trash" v-else></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const CartButtons = () => import("./CartButtons");

export default {
  props: {
    item: { type: Object }
  },
  data() {
    return {
      loading: false
    };
  },
  components: { CartButtons },
  methods: {
    ...mapActions({
      addToCart: "cart/addToCart"
    }),
    async saveForLater(item) {
      this.checkAndAddToCart({
        pid: item._id,
        qty: -100000
      });
      if (!(this.$store.state.auth || {}).user) {
        this.$router.push("/account/login?return=checkout");
        return;
      } else {
        this.saveToWishlist(item);
      }
    },
    async saveToWishlist(item) {
      this.loading = true;
      try {
        let data = await this.$axios.$post("api/wishlists/add", item);
        this.$store.commit("success", "Added to your wishlist");
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$store.commit("setErr", err, { root: true });
      }
    },
    async checkAndAddToCart(item) {
      try {
        this.loading = true;
        await this.addToCart(item);
        this.loading = false;
      } catch (e) {
        console.log("err...", e.toString());
      }
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp;
      return Math.round(percent);
    }
  }
};
</script>

<style>
</style>