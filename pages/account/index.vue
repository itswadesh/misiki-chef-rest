<template>
  <div class="flex flex-col justify-between w-full">
    <AccountMenu class="block md:hidden" />
    <!-- <div class="flex bg-gray-200 border-b">
      <img src="img/malibu.jpg" class="my-4 mx-4 h-20 w-20 rounded-full" />
      <div class="flex justify-center flex-col">
        <h1 class="font-bold text-xl">Cannon camera</h1>
        <div>
          <button class="bg-pink-400 text-xs rounded px-2">Body-Quality</button>
        </div>
      </div>
      <img src="img/external-link-alt-solid.svg" class="h-3 w-3 my-10 mx-4" />
    </div>
    <div class="flex flex-col">
      <ul class="my-4">
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/Customer check.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">User name</div>
          </div>
          <img
            src="img/external-link-alt-solid.svg"
            class="h-3 w-3 my-3 mx-1"
          />
        </li>
        <li class="flex justify-between px-2 py-1">
          <div class="flex">
            <img src="img/authendication.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">ID no</div>
          </div>
          <img class="h-3 w-3 my-3 mx-1" />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/contact us from.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">Mobile no</div>
          </div>
          <img
            src="img/external-link-alt-solid.svg"
            class="h-3 w-3 my-3 mx-1"
          />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/email.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">Gmail</div>
          </div>
          <img
            src="img/external-link-alt-solid.svg"
            class="h-3 w-3 my-3 mx-1"
          />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/factory.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">Address</div>
          </div>
          <img
            src="img/external-link-alt-solid.svg"
            class="h-3 w-3 my-3 mx-1"
          />
        </li>
      </ul>

      <ul class="my-4">
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/order-managment.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">My orders</div>
          </div>
          <img class="h-3 w-3 my-3 mx-1" />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/banners.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">My payments details</div>
          </div>
          <img class="h-3 w-3 my-3 mx-1" />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/contact-us.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">Contact</div>
          </div>
          <img class="h-3 w-3 my-3 mx-1" />
        </li>
        <li class="flex justify-between w-full px-2 py-1">
          <div class="flex">
            <img src="img/customer-service.svg" class="h-6 w-6 m-1" />
            <div class="py-1 font-medium mx-3">support</div>
          </div>
          <img class="h-3 w-3 my-3 mx-1" />
        </li>
      </ul>
    </div> -->
    <!-- <StickyFooter /> -->
  </div>
</template>

<script>
import AccountMenu from "~/components/AccountMenu";
export default {
  layout: "account",
  components: { AccountMenu }
};
</script>
