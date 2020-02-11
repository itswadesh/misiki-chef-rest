<template>
  <div class="rounded shadow border mx-2 h-48 mb-2 relative">
    <img
      :src="p.type === 'V' ? 'veg.png' : 'non-veg.png'"
      class="absolute w-5 top-0 right-0 mr-1 mt-1"
    />
    <img v-lazy="`empty-listing.png`" alt="" class="object-cover h-24" />
    <div class=" p-4">
      <h2>{{ p.name }}</h2>
      <p>{{ p.description }}</p>
      <div>{{ p.rate }}</div>
      <div>{{ p.stock }}</div>
      <div>{{ p.restaurant }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["p"],
  methods: {}
};
</script>

<style></style>
