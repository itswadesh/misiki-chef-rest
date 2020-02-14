<template>
  <div>
    <h1 v-if="!product">Not found</h1>
    <div v-else>
      <h1>{{ product.name }}</h1>
      <div>{{ product.description }}</div>
      <div>{{ product.type }}</div>
      <div>{{ product.rate }}</div>
      <div>{{ product.stock }}</div>
      <div>{{ product.restaurant }}</div>
      <div>{{ product.img }}</div>
      <CartButtons :product="product" :variant="userSelectedVariant" :notify="true" />
      <div class="items-center text-sm px-3 bg-gray-100 my-3 p-3 lg:my-0">
        <div class="flex items-center">
          <span class="mr-4"> SELECT SIZE: </span>
        </div>
        <div
          class="flex flex-wrap py-4 relative px-3"
          :class="{ 'shake-animation': shake }"
        >
          <div v-for="v in product.variants" :key="v._id">
            <button
              @click="selectVariant(v)"
              :class="{
                'bg-gray-700 text-white':
                  v.size == (userSelectedVariant && userSelectedVariant.size)
              }"
              v-if="v.stock > 0"
              class="focus:outline:none m-1 rounded-full border border-gray-400 w-12 h-12 hover:border-black hover:font-bold"
            >
              <div class="text-xs">{{ v.size }}</div>
              <div
                v-if="v.stock < 5"
                class="text-xs font-semibold absolute w-12 bg-orange-500 text-white rounded"
              >
                {{ v.stock }} left
              </div>
            </button>
            <button
              v-else
              class="bg-gray-700 text-white focus:outline:none m-1 rounded-full border border-gray-400 w-12 h-12"
            >
              <div class="text-xs">{{ v.size }}</div>
              <div
                class="text-xs font-semibold absolute w-12 bg-orange-500 text-white rounded"
              >
                No stock
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartButtons from "~/components/cart/CartButtons";
import { mapGetters } from "vuex";
export default {
  components: { CartButtons },
  data() {
    return {
      shake: false,
      product: null,
      userSelectedVariant: null
    };
  },
  async created() {
    try {
      this.product = await this.$axios.$get(
        `/api/foods/slug/${this.$route.params.slug}`
      );
      this.userSelectedVariant = this.product.variants[0];
    } catch (e) {}
  },
  methods: {
    selectVariant(s) {
      this.userSelectedVariant = s;
      this.$emit("variantChanged", s);
      this.selectedImgIndex = 0;
    }
  },
  computed: {
    ...mapGetters({
      checkCart: "cart/checkCart"
    }),
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    calculateOffPercent() {
      if (!this.product || !this.product.variants[0]) return 0;
      let percent =
        ((this.product.variants[0].mrp - this.product.variants[0].price) *
          100) /
        this.product.variants[0].mrp;
      return Math.round(percent);
    },
    calculatePrice() {
      let price = 0;
      if (this.product.variants[0].price < this.product.variants[0].mrp) {
        price = this.product.variants[0].price;
      } else {
        price = this.product.variants[0].mrp;
      }
      return price;
    }
  }
};
</script>

<style></style>
