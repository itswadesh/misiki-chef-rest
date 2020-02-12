<template>
  <div>
    <CheckoutHeader />
    <div class="flex flex-wrap justify-between">
      <div class="lg:w-1/5 xs:w-0"></div>
      <div class="lg:w-8 xs:w-0 mt-10 px-2">
        <div class="pt-8">
          <div class="text-left">
            <ul id="progress">
              <li class="progres-li">
                <div class="node green">
                  <p class="mt-3 ml-2 text-white">1</p>
                </div>
              </li>
              <li class="progres-li">
                <div class="divider grey"></div>
              </li>
              <li class="progres-li">
                <div class="node">
                  <p class="mt-3 ml-2 text-gray-500">2</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="xs:w-full lg:w-1/2 mt-10 px-2">
        <div class="font-bold text-gray-700 w-full py-3 text-lg bg-white mt-3 flex flex-wrap">
          <div class="text-left">Checkout</div>
        </div>
        <div class="flex justify-between border-b border-gray-200 w-full">
          <div class="w-1/4 bg-gray-100">
            <div class="pt-12 pb-2 text-center text-gray-700 text-xl">Ship to</div>
            <ul class="text-center">
              <li class="py-5 hover:bg-gray-200 font-hairline">
                <a href="#">Saved Address</a>
              </li>
              <li class="py-5 bg-white border-l-4 border-pink-500 font-normal">
                <a href="#">New Address</a>
              </li>
            </ul>
          </div>
          <div class="w-8/12 pb-4">
            <div class="pt-12 pb-2 text-left text-gray-700 text-xl">Add an address</div>
            <form class="form w-full p-2">
              <Textbox label="Full Name" class="w-full" />
              <Textbox label="Pin Code" class="w-full" />
              <Textbox label="Address" class="w-full" />
              <Textbox label="Landmark" class="w-full" />

              <div class="w-full flex justify-between">
                <Textbox label="Landmark" class="w-1/2" />
                <Textbox label="Landmark" class="w-1/2" />
              </div>
              <Textbox label="Mobile" class="w-full" />
              <button
                class="tracking-widest w-full mt-3 p-3 hover:bg-pink-600 bg-pink-500 text-white text-sm font-semibold rounded"
              >CONTINUE</button>
            </form>
          </div>
        </div>
        <div class="flex py-8 border-b border-gray-200 mb-4">
          <div class="w-1/3 font-bold text-black mt-3">Pay by</div>
          <div class="w-1/2 font-hairline text-gray-600 mt-3">Select a payment method</div>
          <div class="w-1/3 text-right">
            <button class="p-3 rounded bg-gray-300 text-gray-600 font-bold">CHANGE</button>
          </div>
        </div>
      </div>
      <div class="border-r border-gray-300"></div>
      <CartSummary :cart="cart" hidden lg:block>
        <button
          @click="$router.push('/checkout/payment')"
          class="tracking-widest w-full mt-3 p-3 bg-red-600 text-white text-sm font-semibold rounded"
        >MAKE PAYMENT</button>
      </CartSummary>
      <div class="w-1/5"></div>
    </div>
    <CheckoutFooter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const CartItem = () => import("~/components/cart/CartItem");
const Offers = () => import("~/components/cart/Offers");
const CartSummary = () => import("~/components/cart/CartSummary");
const CheckoutHeader = () => import("~/components/checkout/CheckoutHeader");
const CheckoutFooter = () => import("~/components/checkout/CheckoutFooter");
const Textbox = () => import("~/components/ui/Textbox");

export default {
  components: {
    CartItem,
    Offers,
    CartSummary,
    CheckoutHeader,
    CheckoutFooter,
    Textbox
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    cart() {
      return this.$store.state.cart || {};
    },
    ...mapGetters({
      checkCart: "cart/checkCart",
      showCart: "cart/showCart"
    })
  }
};
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */

.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 1.5rem;
}

/* vertical scroll bar starts */
.node {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  transition: all 1000ms ease;
  margin-left: -0.7rem;
  margin-bottom: 0.5rem;
}

.divider {
  height: 42.5rem;
  width: 2px;
  transition: all 800ms ease;
  margin-bottom: 0.5rem;
}

.progres-li {
  list-style: none;
  line-height: 1px;
}

.green {
  background-color: #ed54a4;
}
.grey {
  background-color: lightgray;
}
/* vertical scroll bar ends */
</style>