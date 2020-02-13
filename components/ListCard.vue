<template>
  <div>
    <!-- <div class="flex bg-white justify-between py-4 px-2">
      <input
        type="text"
        class="border text-xl rounded-full w-full"
        name="search"
      />
      <img
        src="img/banners.svg"
        class="h-8 rounded-full w-8 bg-gray-300 ml-2"
      />
    </div>
    <div class="flex justify-between">
      <h1 class="font-bold px-2">Popular of the week</h1>
      <h2 class="font-medium text-sm px-2">Show all (>)</h2>
    </div> -->
    <div class="flex bg-white border rounded shadow py-2 px-1 m-2">
      <div class="p-2">
        <img src="seattle.jpg" class="h-20 w-20 rounded" />
      </div>
      <div class="m-2 relative w-full">
        <img src="seattle.jpg" class="h-4 w-4 absolute top-0 right-0" />
        <div class="font-bold text-lg">{{ p.name }}</div>
        <div class="flex">
          <i class="fab fa-map-marker-alt text-gray-300 h-4 w-4 my-1 mr-2" />
          <div class="font-medium text-sm text-gray-500">
            {{ p.price | currency }}
          </div>
        </div>
        <div class="flex justify-around items-center">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <!-- <i class="fa fa-star h-3 w-3 my-2" /> -->
            <!-- <span class="font-medium text-sm text-black mx-1">4.6</!-->
            <!-- <div class="font-medium text-sm text-gray-500">(rating/review)</div> -->
          </div>
          <div
            class="bg-orange-500 rounded-full text-white font-semibold text-xs px-1"
          >
            Free Delivery
          </div>
        </div>
      </div>
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
