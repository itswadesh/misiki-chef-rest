<template>
  <div class="mt-10 w-full">
    <div class="4/5 right-0 pb-3 bb text-sm text-gray-500 leading-relaxed mb-6">
      <div>
        <p class="text-gray-500 mt-4 font-semibold text-xs">Price Details</p>
        <div class="flex justify-between mt-1">
          <div class="text-sm text-left">Bag Total</div>
          <div class="ml-2 text-black-400 text-right">{{cart.subtotal| currency}}</div>
        </div>
        <div
          class="flex justify-between mt-1"
          v-if="cart.discount>0"
        >
          <div class="text-sm text-left">Bag Discount</div>
          <div class="ml-2 text-black-400 text-right">{{cart.discount | currency}}</div>
        </div>

        <div class="flex justify-between mt-1">
          <div class="text-sm text-left">Order Total</div>
          <div class="ml-2 text-black-400 text-right">{{cart.subtotal - cart.discount | currency}}</div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="text-sm text-left">Delivery Charges</div>
          <div
            v-if="$store.state.settings && $store.state.settings.shipping && $store.state.settings.shipping.charge>0"
            class="ml-2 text-black-400 text-right"
          >{{$store.state.settings.shipping.charge| currency}}</div>
          <div
            v-else
            class="ml-2 text-black-400 text-right"
          >FREE</div>
        </div>
      </div>
    </div>
    <div class="fixed left-0 bottom-0 lg:relative bg-white w-full px-4 pb-2 lg:pr-0">
      <div class="flex justify-between mt-2">
        <div class="text-lg font-bold text-left">Total</div>
        <div class="font-bold text-black text-right">{{cart.total | currency}}</div>
      </div>
      <Button
        @click="proceed"
        color="primary"
      >CONTINUE</Button>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/Button";
export default {
  props: {
    selectedAddress: { type: String }
  },
  computed: {
    cart() {
      return this.$store.state.cart || {};
    }
  },
  components: {
    Button
  },
  methods:{
    proceed(){
      if(!this.selectedAddress){
        this.$router.push(`/checkout/add`)
        return
      }
      this.$router.push(`/checkout/payment-mobile?address=${this.selectedAddress}`)
    }
  }
};
</script>

<style>
</style>