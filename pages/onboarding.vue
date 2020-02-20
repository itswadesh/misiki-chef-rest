<template>
  <div
    class="bg-local h-screen bg-cover bg-center text-center flex flex-col justify-center"
    style="background-image: url(/fresh-fruits.jpg)"
  >
    <div class="font-black text-4xl my-3 text-center">SUNABEDA</div>
    <nuxt-link
      to="/my/profile"
      class="flex border mx-1/4 rounded-full primary text-white"
    >
      <div class="mx-10 my-auto font-bold">Welcome</div>
      <i class="fa fa-long-arrow-right w-18 border-l rounded-l-full p-2 align-middle" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
</style>