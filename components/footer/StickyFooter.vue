<template>
  <div
    class="mt-2 shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10"
  >
    <div class="flex px-3 py-1 justify-around items-center">
      <nuxt-link
        to="/search"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-search" /><span>Discovery</span>
      </nuxt-link>
      <!-- <a
        href="/search"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-truck" /><span>Cart</span>
      </a> -->
      <nuxt-link
        to="/account"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-user" /><span>Account</span>
      </nuxt-link>
      <nuxt-link
        to="/offers"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-tag" /><span>Offers</span>
      </nuxt-link>
      <nuxt-link
        to="/cart"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-shopping-cart" /><span>Cart</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
