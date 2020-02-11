<template>
  <div
    style="min-height:71.8vh"
    class="antialiased "
  >
    <nuxt />
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import AccountMenu from "~/components/AccountMenu";
export default {
  components: { Header, Footer, AccountMenu }
};
</script>
