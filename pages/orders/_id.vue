<template>
  <div>
    <Header />
    <center class="title">
      <strong>Order Details</strong>
    </center>
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
  components: { Product, Header }
};
</script>
