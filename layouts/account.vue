<template>
  <div>
    <Header />
    <div
      class="flex flex-wrap justify-center w-full bg-gray-100 pb-5 antialiased"
      style="min-height:71.8vh"
    >
      <AccountMenu class="hidden md:block" />
      <div class="flex-1">
        <Loading />
        <div
          v-if="$store.state.errors"
          class="err"
        >
          <span
            v-for="(e,ix) in $store.state.errors"
            :key="ix"
          >{{e.message}}</span>
        </div>
        <nuxt />
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Header from '~/components/Header'
import StickyFooter from '~/components/footer/StickyFooter'
import AccountMenu from '~/components/AccountMenu'
import Loading from '~/components/ui/Loading'
export default {
  components: { Header, StickyFooter, AccountMenu, Loading }
}
</script>
