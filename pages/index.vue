<template>
  <div>
    <Boarding />
    <GeoLocation />
  </div>
</template>

<script>
import GeoLocation from "~/components/GeoLocation.vue";
import Boarding from "~/components/Boarding.vue";
import Footer from "~/components/footer/Footer.vue";
import Hero from "~/components/Hero.vue";

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
    GeoLocation,
    Boarding,
    Footer,
    Hero
  }
};
</script>
