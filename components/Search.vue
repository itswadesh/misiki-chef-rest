<script>
</script>
<template>
  <form
    novalidate
    autocomplete="off"
  >
    <div class="absolute">
      <i
        class="fa fa-search m-3 text-gray-500"
        aria-hidden="true"
      />
    </div>
    <input
      type="text"
      v-model="$route.query.q"
      class="w-full px-10 bg-purple-white pr-4 border border-gray-200 rounded-full    border-0 h-10 focus:outline-none text-xs shadow"
      placeholder="Search for items"
      name="search"
    />
  </form>
</template>