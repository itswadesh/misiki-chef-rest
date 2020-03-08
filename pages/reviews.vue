<template>
  <div>
    <Heading title="Reviews" />

    <StickyFooter />
  </div>
</template>

<script>
const StickyFooter = () => import('~/components/footer/StickyFooter')
const Heading = () => import('~/components/Heading')
import reviews from '~/gql/product/reviews.gql'

export default {
  components: { StickyFooter, Heading },
  data() {
    return {
      reviews: null
    }
  },
  async mounted() {
    try {
      this.reviews = (
        await this.$apollo.query({
          query: reviews,
          fetchPolicy: 'no-cache'
        })
      ).data.reviews
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  }
}
</script>

<style>
</style>