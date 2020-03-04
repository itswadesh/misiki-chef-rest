<template>
  <div class="bg-gray-100 antialiased min-h-screen">
    <Loading />
    <Search />
    <div class="mt-16 mb-12">
      <nuxt />
    </div>
    <StickyFooter />
    <BackToTopDark />
  </div>
</template>
<script>
import { BackToTopDark } from "~/components/ui";
import Search from "~/components/Search";
import StickyFooter from "~/components/footer/StickyFooter";
import Loading from "~/components/ui/Loading";

export default {
  components: { Search, StickyFooter, BackToTopDark, Loading }
};
</script>
