<template>
  <div class="rounded shadow border mx-2 mb-2 relative">
    <img
      :src="p.type === 'V' ? 'veg.png' : 'non-veg.png'"
      class="absolute w-5 top-0 right-0 mr-1 mt-1"
    />
    <img v-lazy="`/empty-listing.png`" alt="" class="object-cover h-24 mb-2" />
    <div class="px-2">
      <div v-if="p.ratings">
        <Ratingcircle :rating="p.ratings" class="m-review" />
        <div class="pl-2 review-font">{{ p.reviews }} reviews</div>
      </div>
      <h2 class="text-xs font-bold tracking-wide">{{ p.name }}</h2>
      <p>{{ p.description }}</p>
      <div class="flex flex-wrap justify-between items-center my-2">
        <div class="font-bold">{{ p.rate | currency }}</div>
        <div class="text-red-500 text-xs">Only {{ p.stock }} left</div>
        <img
          :src="p.type === 'V' ? 'veg.png' : 'non-veg.png'"
          class="w-5 mr-1 mt-1"
        />
      </div>
      <div class="border-t py-1">By {{ p.restaurant }}</div>
    </div>
  </div>
</template>

<script>
import Ratingcircle from "./Ratingcircle";
export default {
  props: ["p"],
  methods: {},
  components: { Ratingcircle }
};
</script>

<style></style>
