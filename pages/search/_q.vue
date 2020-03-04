<template>
  <div>
    <!-- <Banner /> -->
    <div class="container">
      <!-- <Categories /> -->
      <div
        class="flex flex-wrap"
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
      >
        <div class="w-full" v-for="p in data" :key="p._id">
          <ListCard :p="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "~/components/Heading";
import Banner from "~/components/Banner";
import Product from "~/components/Product";
import ListCard from "~/components/ListCard";
import Categories from "~/components/Categories";
import { query, infiniteScroll } from "~/mixins";
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from "~/config";
import { constructURL } from "~/lib/";

export default {
  layout: "search",
  mixins: [infiniteScroll],
  data() {
    return {
      loading: false,
      error: null,
      user: null
    };
  },
  async created() {
    const q = this.$route.params.q || null,
      qry = { ...this.$route.query };
    if (q) qry.search = q;
    // this.getData(qry);
  },
  methods: {
    // async getData(query) {
    //   try {
    //     const products = (
    //       await this.$apollo.query({
    //         query: search,
    //         variables: query,
    //         fetchPolicy: "no-cache"
    //       })
    //     ).data.my;
    //     this.productCount = products.count;
    //     this.products = products.data;
    //   } catch (e) {
    //     this.err = e;
    //   } finally {
    //   }
    // }
  },
  components: {
    Heading,
    Banner,
    Product,
    Categories,
    ListCard
  }
};
</script>
