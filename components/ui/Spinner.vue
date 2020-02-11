<template>
  <div class="ar-spinner" v-if="visible">
    <img src="@/static/oval.svg" alt="" />
  </div>
</template>

<script>
/*
 * Spinner component to be used as a loader
 * or anything you wnat, who am i to say.
 *
 * @alias <ui-spinner :visibility="boolean" />
 * @props {boolean} visibility - Visibility state of the spinner
 */
export default {
  name: "ArSpinner",
  data() {
    return {
      visible: false
    };
  },
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visibility() {
      this.visible = this.visibility;
    }
  },
  methods: {
    click(e) {
      e.preventDefault();
    }
  }
};
</script>

<style lang="sass" scoped>
.ar-spinner
  width: 100%
  height: 100%
  padding: 10px
  z-index: 100
  background-color: #f5f5f5b3
  @apply mx-auto absolute top-0 left-0

  img
    display: block
    width: 100%
    max-width: 100px
    height: auto
    max-height: 100%
    margin: 0 auto
    background-size: contain
</style>