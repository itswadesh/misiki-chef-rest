<template>
  <div class="mt-2 shadow-lg w-full bg-gray-100 border-t overflow-x-auto fixed bottom-0 z-10 text-gray-600">
    <div class="flex justify-around items-center">
      <nuxt-link
        to="/foods"
        class="category-item"
        active-class="text-primary"
      >
        <i class="fa fa-search" />
        <span class="text-xs">Dishes</span>
      </nuxt-link>
      <nuxt-link
        to="/my"
        class="category-item"
        active-class="text-primary"
      >
        <i class="fa fa-user" />
        <span class="text-xs">Profile</span>
      </nuxt-link>
      <nuxt-link
        to="/orders"
        class="category-item"
        active-class="text-primary"
      >
        <i class="fa fa-tag" />
        <span class="text-xs">Orders</span>
      </nuxt-link>
      <nuxt-link
        to="/reviews"
        class="category-item"
        active-class="text-primary"
      >
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
