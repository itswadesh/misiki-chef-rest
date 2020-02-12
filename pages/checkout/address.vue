<template>
  <div>
    <CheckoutHeader selected="address" />
    <div style="max-width: 1000px;margin: 0 auto;">
      <div class="mx-auto lg:mx-10 p-2 flex justify-between flex-wrap items-start">
        <!-- Left sidebar -->
        <div class="flex w-full md:w-2/3 flex-wrap justify-start desktop1-base-left">
          <div
            class="w-full md:w-1/2 p-2 flex flex-wrap justify-between"
            v-for="(a,ix) in addresses"
            :key="a._id"
          >
            <div
              class="w-full shadow bg-white rounded border p-2"
              :class="{'border-green-500':selectedAddress==a._id}"
            >
              <div class="flex">
                <label class="cursor-pointer w-full flex justify-between">
                  <div>
                    <Radio
                      :checked="selectedAddress==a._id"
                      @changed="addressChanged"
                      :value="a._id"
                    />
                  </div>
                  <div class="flex-1 ml-2">
                    <div class="font-semibold">{{a.firstName}} {{a.lastName}}</div>
                    <div class="py-2 text-xs">
                      <div>{{a.address}}</div>
                      <div>{{a.phone}}</div>
                      <div>{{a.state}}</div>
                      <div>{{a.city}}</div>
                      <div>{{a.country}}</div>
                      <div>{{a.zip}}</div>
                      <div class="py-2">
                        Mobile:
                        <span class="font-bold">{{a.phone}}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="ix==0">
                    <div class="rounded-full text-xs bg-gray-200 py-1 px-2">Default</div>
                  </div>
                </label>
              </div>
              <div class="border-t border-gray-200 flex w-full">
                <button
                  @click="del(a)"
                  class="tracking-widest w-1/2 text-blue-500 py-1 border-r border-gray-200 mt-1"
                >Remove</button>
                <button
                  @click="go(`/checkout/add?id=${a._id}`)"
                  class="tracking-widest w-1/2 text-blue-500 py-1 mt-1"
                >Edit</button>
              </div>
            </div>
          </div>
          <div class="lg:block">
            <AddressNewCard class="mx-2 mb-2" />
          </div>
        </div>
        <!-- Right sidebar -->
        <div class="w-full md:w-1/3 desktop1-base-right">
          <label
            class="flex justify-start border rounded p-2 text-sm border-green-300 bg-green-100"
          >
            <div class="ml-2">
              <div class="font-bold text-black">Standard Delivery</div>
              <div class="text-gray-500">Delivery Charge ₹149</div>
            </div>
          </label>
          <div v-for="(item,ix) in cart.items" :key="ix" :item="item" class="flex my-5">
            <img
              class="lg:rounded xs:rounded-b-none w-20"
              v-lazy="$store.state.settings.CDN_URL+item.img"
              alt
            />
            {{item.name | truncate(30)}}
          </div>
          <CartSummaryCheckout :selectedAddress="selectedAddress" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressCard from "~/components/checkout/AddressCard";
import SelectAddress from "~/components/checkout/SelectAddress";
import AddressNewCard from "~/components/checkout/AddressNewCard";
import CartSummaryCheckout from "~/components/checkout/CartSummaryCheckout";
import Radio from "~/components/ui/Radio";
import CartItem from "~/components/cart/CartItem";
const CheckoutHeader = () => import("~/components/checkout/CheckoutHeader");
export default {
  // fetch({ store, redirect }) {
  //   if (!(store.state.auth || {}).user)
  //     return redirect("/account/login?return=/checkout/address");
  // },
  data() {
    return {
      office: false,
      a: {},
      addresses: [],
      selectedAddress: ""
    };
  },
  created() {
    this.getAddress();
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    cart() {
      return this.$store.state.cart || {};
    }
  },
  components: {
    CartItem,
    CheckoutHeader,
    Radio,
    SelectAddress,
    AddressNewCard,
    AddressCard,
    CartSummaryCheckout
  },
  methods: {
    addressChanged(e) {
      this.selectedAddress = e;
    },
    del(a) {
      try {
        this.$store.commit("busy", true);
        this.$axios.$delete(`api/addresses/${a._id}`);
        this.getAddress();
        this.$store.commit("busy", false);
      } catch (e) {
        this.$store.commit("busy", false);
      }
    },
    async getAddress() {
      try {
        const a = await this.$axios.$get("api/addresses/my");
        this.addresses = a.data;
        this.selectedAddress = a.data[0] && a.data[0]._id;
      } catch (e) {}
    },
    go(url) {
      this.$router.push(url);
    }
  },
  layout: "none"
};
</script>

<style scoped>
.desktop1-base-right {
  vertical-align: top;
  padding: 35px 0 0 35px;
}
.desktop1-base-left {
  display: flex;
  vertical-align: top;
  border-right: 1px solid #eaeaec;
  padding-right: 35px;
  margin-top: 30px;
}
</style>