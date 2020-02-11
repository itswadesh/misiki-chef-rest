<template>
  <div class="image-card image">
    <img :src="src" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.image-card
  width: 100%
  height: auto
  // margin
  

</style>
