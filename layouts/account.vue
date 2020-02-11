<template>
  <div>
    <Header />
    <div
      class="flex flex-wrap justify-center bg-gray-100 pb-5 antialiased"
      style="min-height:71.8vh"
    >
      <AccountMenu class="hidden md:block" />
      <nuxt />
    </div>
    <Footer />
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
