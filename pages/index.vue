<template>
  <div>
    <div class="h-screen">
      <Heading title="Welcome to misiki" />
      <div v-if="todayTotal">
        <div class="flex noprint justify-center text-gray-600">
          <h2>{{ todayTotal.count }}</h2>
          <h1>{{ todayTotal.total | currency }}</h1>
        </div>
      </div>
      <nuxt-link
        to="/orders"
        class="flex justify-center mt-12"
      >
        <h1 v-if="orders.length>0">{{orders.length}} Orders</h1>
        <h1 v-else>No pending orders</h1>
      </nuxt-link>
    </div>
    <StickyFooter />
    <GeoLocation />
  </div>
</template>

<script>
import GeoLocation from "~/components/GeoLocation.vue";
import Heading from "~/components/Heading.vue";
import StickyFooter from "~/components/footer/StickyFooter";

export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=my/profile");
  },
  async asyncData({ $axios }) {
    let orders = [],
      status = "Received",
      todayTotal = null,
      todaySummary = null;
    try {
      orders = await $axios.$get("api/food-orders/pending");
      todayTotal = await $axios.$get("api/food-orders/my/today");
      todaySummary = await $axios.$get("api/food-orders/todays-summary");
    } catch (e) {}
    return { orders: orders.data, todayTotal, todaySummary };
  },
  // data() {
  //   return {
  //     orders: []
  //   };
  // },
  // async created() {
  //   let geoCookie = this.$cookies.get("geo");
  //   if (!geoCookie) this.$router.push("/onboarding");
  //   try {
  //     const p = await this.$axios.$get("api/orders/my");
  //     this.orders = p.data;
  //   } catch (e) {
  //     this.orders = [];
  //   }
  // },
  components: {
    GeoLocation,
    Heading,
    StickyFooter
  }
};
</script>
