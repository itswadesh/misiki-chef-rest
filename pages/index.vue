<template>
  <div>
    <Header />
    <Hero />
    <div class="container">
      <Categories />
      <BestSellers />
      <RecentVisit />
      <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class="" />
        </div>
      </div>
    </div>
    <Footer />
    <GeoLocation />
  </div>
</template>

<script>
import GeoLocation from "~/components/GeoLocation.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/footer/Footer.vue";
import Hero from "~/components/Hero.vue";
import Product from "~/components/Product.vue";
import Categories from "~/components/Categories.vue";
import StickyFooter from "~/components/footer/StickyFooter";
import BestSellers from "~/components/home/BestSellers";
import RecentVisit from "~/components/home/RecentVisit";

export default {
  data() {
    return {
      products: []
    };
  },
  async created() {
    const city = this.$cookies.get("city");
    if (!city || city == "") this.$router.push("/change-location");
    let q = this.$route.params.q || "";
    try {
      this.foods = await this.$axios.$get(
        `api/foods/group?daily=false&city=${city}&search=${q}`
      );
    } catch (e) {
      if (e.status == 444) this.$router.push("/change-location");
      this.foods = [];
    }
    try {
      const p = await this.$axios.$get("api/foods");
      this.products = p.data;
    } catch (e) {
      this.products = [];
    }
  },
  components: {
    GeoLocation,
    Header,
    Footer,
    Hero,
    Product,
    Categories,
    StickyFooter,
    BestSellers,
    RecentVisit
  }
};
</script>
