<template>
  <div>
    <div class="margin-auto width-1/2 mt-24 text-center">
      <img
        src="/thankyou.jpg"
        class="m-auto w-1/2 lg:w-1/5 h-40 object-cover"
        alt=""
      />
      <p class="font-bold text-lg py-3">Thank You</p>
      <p class="text-sm text-gray-500 py-3">We have received your request and will get back to you in 24-48 hours</p>
      <button class="text-white bg-pink-500 px-2 py-1 mt-2">CONTINUE SHOPPING</button>
    </div>
  </div>
</template>

<script>
import Checkbox from "~/components/ui/Checkbox";
export default {
  components: { Checkbox }
};
</script>