<template>
  <div>
    <Header />
    <center class="title">
      <strong>Order Details</strong>
    </center>
    <product
      :products="cartItems"
      v-if="cartItems!=0"
      :showcart="false"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/Header");
export default {
  data() {
    return {
      loading: false
    };
  },
  components: { Product, Header },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
    // ...mapState({
    //   shipping: state => state.shipping || {},
    //   totalAmount: state => state.cart.totalAmount || 0,
    //   cartItems: state => state.cart.items || [],
    //   orderItems: state => state.orderItems || []
    // }),
    // ...mapGetters({
    // checkCart: "cart/checkCart",
    // getTotal: "cart/getTotal"
    // })
  },
  methods: {
    // ...mapActions({
    //   checkout: "cart/checkout",
    //   addToCart: "cart/addToCart"
    // }),

    async placeOrder() {
      if (this.loading) return;
      if (this.getTotal == 0) return;
      this.loading = true;
      if (!this.user) {
        try {
          this.loading = false;
        } catch (e) {
          this.loading = false;
        }
      } else {
        this.askAddress();
      }
    }
  }
};
</script>
<style>
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
}
.font {
  font-size: 13px;
}
</style>

