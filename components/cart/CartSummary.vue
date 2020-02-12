<template>
  <div class="lg:w-1/4 mt-10 lg:pr-20 xs:w-full px-3">
    <div class="w-full flex flex-wrap hr-line justify-between pb-2 relative">
      <input
        type="search"
        class="bg-gray-200 border p-2 w-full rounded focus:outline-none"
        placeholder="Promo Code"
      />
      <button
        class="absolute right-0 text-sm mt-2 text-gray-500 pr-2 focus:outline-none hover:text-gray-600 cursor-pointer"
      >APPLY</button>
    </div>
    <div class="4/5 right-0 border-b border-dotted lg:mb-0">
      <div>
        <p class="text-black mt-4 font-normal text-xl">Price Summary</p>
        <span class="text-gray-400 text-xs">Includes GST and all government taxes</span>
        <div class="flex justify-between mt-1">
          <div class="w-1/2 text-sm text-left">Total item price</div>
          <div class="ml-2 w-1/2 text-black-400 text-right">{{cart.subtotal| currency}}</div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="w-1/2 text-sm text-left">Item discount</div>
          <div class="ml-2 w-1/2 text-black-400 text-right">{{cart.discount | currency}}</div>
        </div>
        <div
          class="flex justify-between mt-1"
          v-if="$store.state.settings && $store.state.settings.shipping"
        >
          <div class="w-1/2 text-sm text-left">Shipping fee</div>
          <div
            class="ml-2 w-1/2 text-black-400 text-right"
            v-if="$store.state.settings.shipping.charge>0"
          >{{$store.state.settings.shipping.charge| currency}}</div>
          <div class="ml-2 w-1/2 text-black-400 text-right" v-else>FREE</div>
        </div>
        <div class="mt-1">
          <p class="text-xs text-gray-400 pb-2">
            Free shipping on orders of ₹999 or
            more. For first purchase,
            <a
              href
              class="underline"
            >See Offer</a>
          </p>
        </div>
      </div>
      <div class="text-xs bg-red-100 rounded p-2 text-gray-500 my-2">
        <div class="flex items-center">
          <img src="/shield.png" class="w-12 pr-2" alt="" />
          <div class="ml-1 justify">
            Genuine products. 15 day returns. 100% secure payments.
            <span
              class="text-black"
            >Know More</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full right-0 lg:relative fixed bottom-0 bg-white px-2 lg:px-0 lg:py-0 py-4 shadow lg:shadow-none"
    >
      <div class="flex justify-between mt-2">
        <div class="w-1/2 text-lg font-bold text-left">Total</div>
        <div class="ml-2 w-1/2 font-bold text-black-400 text-right">{{cart.total | currency}}</div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: { type: Object }
  }
};
</script>

<style>
</style>