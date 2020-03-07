<template>
  <div
    style="min-height:71.8vh"
    class="antialiased "
  >
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
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/footer/Footer'
import AccountMenu from '~/components/AccountMenu'
import Loading from '~/components/ui/Loading'

export default {
  components: { Header, Footer, AccountMenu, Loading }
}
</script>
