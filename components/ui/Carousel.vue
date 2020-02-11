<template>
  <div class="ar-carousel">
    <div
      class="ar-carousel__slides"
      ref="slides"
    >
      <slot></slot>
    </div>
    <div
      class="ar-carousel__btn-left"
      @click="slide('left')"
    >
      <i class="fa fa-chevron-left" />
    </div>
    <div
      class="ar-carousel__btn-right"
      @click="slide('right')"
    >
      <i class="fa fa-chevron-right" />
    </div>
  </div>
</template>

<script>
import ImageCard from "~/components/ui/ImageCard";
export default {
  name: "Carousel",
  data() {
    return {
      offsetSlide: 0,
      offsetAvailabel: 0,
      slideCount: 0,
      slideWidth: 0
    };
  },
  methods: {
    slide(direction) {
      console.log(this.$refs.slides.children[0]);
      this.slideCount = this.$refs.slides.childElementCount;

      if (direction === "right") {
        if (this.offsetSlide < this.slideCount - 1) {
          this.offsetSlide = this.offsetSlide + 1;
        } else {
          this.offsetSlide = 0;
        }
      } else {
        if (this.offsetSlide > 0) {
          this.offsetSlide = this.offsetSlide - 1;
        } else {
          this.offsetSlide = this.slideCount - 1;
        }
      }

      for (var i = 0; i < this.$refs.slides.childElementCount; i++) {
        this.$refs.slides.children[i].style = `transform: translateX(-${this
          .offsetSlide * 100}%);`;
      }
    }
  },
  components: {
    ImageCard
  }
};
</script>

<style lang="sass" scoped>
.ar-carousel
  width: 100%
  height: auto
  @apply relative 

  &__slides
    width: auto
    height: auto
    @apply flex shadow overflow-hidden flex-row flex-no-wrap

  &__slide
    flex-grow: 0
    flex-shrink: 0
    height: auto
    transform: translateX(0)
    transition: all 0.14s ease
  
  &__btn-left,
  &__btn-right
    @apply absolute cursor-pointer text-center bg-white shadow
    line-height: 100px
    border-top-right-radius: 2px
    border-bottom-right-radius: 2px
    width: 50px
    height: 100px
    top: calc(50% - 50px)
  &__btn-left
    left: 0
  &__btn-right
    right: 0

  


</style>


