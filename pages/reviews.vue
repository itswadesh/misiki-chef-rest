<template>
  <div>
    <Heading title="Reviews" />
    <StickyFooter />
  </div>
</template>

<script>
const StickyFooter = () => import("~/components/footer/StickyFooter");
const Heading = () => import("~/components/Heading");

export default {
  components: { StickyFooter, Heading }
};
</script>

<style>
</style>