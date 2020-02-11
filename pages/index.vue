<template>
  <div>
    <Header />
    <Banner />
    <div class="container">
      <Categories />
      <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class="" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Banner from "~/components/Banner.vue";
import Product from "~/components/Product.vue";
import Categories from "~/components/Categories.vue";

export default {
  data() {
    return {
      products: []
    };
  },
  async created() {
    try {
      const p = await this.$axios.$get("api/foods");
      this.products = p.data;
    } catch (e) {
      this.products = [];
    }
  },
  components: {
    Header,
    Footer,
    Banner,
    Product,
    Categories
  }
};
</script>
