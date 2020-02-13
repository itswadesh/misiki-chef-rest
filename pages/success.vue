<template>
  <div class=" bg-gray-100">
    <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/" class="flex-1 text-left absolute font-bold"
        ><i class="fa fa-arrow-left mr-1 text-gray-600"
      /></nuxt-link>
      <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">
        Success
      </h1>
    </div>
    <div class="px-8 text-lg tracking-wider">
      <!-- <div class="flex justify-center py-6">
        <img src="seattle.jpg" class="h-40 w-40 rounded-full" />
      </div> -->
      <div class="text-green-500 py-2 flex items-center">
        <div class="list-avatar bg-green-500">1</div>
        <i class="fa fa-tick" /> Wating for confirmation
      </div>
      <div class="text-gray-500 py-2 flex items-center">
        <div class="list-avatar bg-gray-500">2</div>
        Food is being prerared
      </div>
      <div class="text-gray-500 py-2 flex items-center">
        <div class="list-avatar bg-gray-500">3</div>
        <i class="fa fa-bowl" /> Out for delivery
      </div>
      <div class="text-gray-500 py-2 flex items-center">
        <div class="list-avatar bg-gray-500">4</div>
        <i class="fa fa-tick" /> Delivered
      </div>
    </div>
    <div class="py-2 text-center">
      <nuxt-link
        to="/live"
        class="inline-block bg-orange-500 mt-8 mb-2 text-white rounded-full py-2 px-8"
      >
        Order more
      </nuxt-link>
      <div>Geocast</div>
    </div>
    <!-- <nuxt-link to="/orders" class="block text-gray-500 mb-10 mt-2"
        >Go to orders</nuxt-link
      > -->
  </div>
</template>
