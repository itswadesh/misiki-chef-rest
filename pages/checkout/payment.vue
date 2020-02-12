<template>
  <div>
    <CheckoutHeader />
    <div class="flex flex-wrap justify-between">
      <div class="lg:w-16 xs:w-0"></div>
      <div class="xs:w-full lg:w-2/4 mt-10 px-2">
        <!-- <Offers /> -->
        <div class="font-bold text-gray-700 w-full p-3 text-lg bg-white mt-3 flex flex-wrap">
          <div class="text-left w-1/2">My Shopping Bag ({{cart.qty}} Items)</div>
          <div class="text-right w-1/2">Total {{cart.total | currency}}</div>
        </div>
        <CartItem v-for="item in cart.items" :key="item._id" :item="item" />
        <div class="hidden lg:block">
          <nuxt-link to="wishlist" class="w-full shadow flex flex-wrap p-4 mt-6 mb-6">
            <i class="fa fa-bookmark-o mt-1 mr-2" aria-hidden="true"></i> Add More From Wishlist
            <i class="fa fa-angle-right mt-1 ml-2" aria-hidden="true"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="border-r border-gray-300"></div>
      <CartSummary :cart="cart">
        <button
          @click="placeOrder()"
          class="tracking-widest w-full mt-3 p-3 bg-red-600 text-white text-sm font-semibold rounded"
        >CONFIRM ORDER</button>
      </CartSummary>

      <div class="w-8"></div>
    </div>
    <CheckoutFooter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const CartItem = () => import("~/components/cart/CartItem");
const Offers = () => import("~/components/cart/Offers");
const CartSummary = () => import("~/components/cart/CartSummary");
const CheckoutHeader = () => import("~/components/checkout/CheckoutHeader");
const CheckoutFooter = () => import("~/components/checkout/CheckoutFooter");

export default {
  components: { CartItem, Offers, CartSummary, CheckoutHeader, CheckoutFooter },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    cart() {
      return this.$store.state.cart || {};
    },
    ...mapGetters({
      checkCart: "cart/checkCart",
      showCart: "cart/showCart"
    })
  },
  methods: {
    placeOrder() {}
  }
};
</script>

<style scoped>
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 1.5rem;
}
</style>