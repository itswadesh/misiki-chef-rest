<template>
  <div class="mt-2 shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10">
    <div class="flex px-3 py-1 justify-around items-center">
      <nuxt-link
        to="/foods"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-search" />
        <span class="text-xs">Dishes</span>
      </nuxt-link>
      <!-- <a
        href="/search"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-truck" /><span>Cart</span>
      </a>-->
      <nuxt-link
        to="/kitchen"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-user" />
        <span class="text-xs">Kitchen</span>
      </nuxt-link>
      <nuxt-link
        to="/orders"
        class="cursor-pointer flex flex-col flex-1 justify-center items-center"
      >
        <i class="fa fa-tag" />
        <span class="text-xs">Orders</span>
      </nuxt-link>
      <nuxt-link to="/reviews" class="cursor-pointer flex flex-col flex-1 justify-center items-center">
        <i class="fa fa-shopping-cart" />
        <span class="text-xs">Reviews</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
