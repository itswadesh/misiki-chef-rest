<template>
  <div class="h-48 w-full">
    <carousel :perPage="1" :paginationEnabled="false">
      <slide v-for="(i, ix) in $store.state.settings.banners.slider" :key="ix">
        <img class="h-48 object-stretch w-full" v-lazy="i.image" alt />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  data() {
    return { images: [""] };
  },
  components: {
    Carousel,
    Slide
  }
};
</script>

<style></style>
