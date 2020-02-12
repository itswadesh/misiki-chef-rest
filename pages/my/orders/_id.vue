<template>
  <div>
    <h1
      class="text-center"
      v-if="!order"
    >
      Order not found
    </h1>
    <div
      class="flex flex-wrap justify-between shadow bg-gray-200"
      v-else
    >
      <div class="text-center text-sm text-black bg-white w-full py-5 tracking-widest">
        <p class="font-semibold">Order {{order.orderNo}}</p>
        <Span class="flex flex-wrap justify-center text-gray-600 text-xs">
          Placed on {{order.createdAt | date}}
          <li class="list-disc ml-2">{{order.amount.total | currency}} for 1 item</li>
        </Span>
      </div>
      <div class="lg:w-16 xs:w-0"></div>
      <div class="xs:w-full lg:w-2/4 mt-5 p-2">
        <div class="w-full flex flex-wrap mb-5 mt-5 text-sm">
          <div class="w-1/2">
            <span class="text-gray-700">Shipment 1 of 1</span>
            <br />
            <span class="text-gray-600">Arrives by Sep 21</span>
          </div>
          <div class="w-1/2">
            <span class="text-gray-700">Total</span>
            <br />
            <span class="text-gray-600">{{order.amount.total | currency}} for 1 item</span>
          </div>
        </div>
        <p
          v-if="order.payment.method=='COD'"
          class="bg-green-500 text-white text-center p-1 rounded"
        >Please pay {{order.amount.total | currency}} to the delivery agent</p>
        <div
          v-for="i in order.items"
          :key="i._id"
          class="p-5 py-8 mt-2 flex justify-between py-1 border-b border-gray-300 bg-white rounded"
        >
          <div>
            <img
              class="lg:rounded xs:rounded-b-none w-32"
              :src="$store.state.settings.CDN_URL+i.img[0]"
              alt=""
            />
          </div>
          <div class="lg:w-4/5 right-0 xs:9/12">
            <div class="pl-4 font-hairline">
              <p class="text-black">{{i.name}}</p>
              <div class="flex">
                <p class="text-gray-500">
                  <span>Size:</span>
                  {{i.size}}
                </p>
                <span class="inline-block rounded-full bg-gray-300 h-2 w-2 m-2"></span>
              </div>
              <div class="relative">
                <span class="text-black font-bold text-2xl">{{i.price | currency}}</span>
              </div>
              <div v-if="order.status=='Cancelled'">
                <div class="rnd-mnt flex">
                  <div class="h-4">
                    <img
                      src="/return.svg"
                      class="rounded-full p-2 w-6 bg-blue-500 mr-2"
                      alt=""
                    />
                  </div>
                  <div
                    class="text-sm"
                    style="margin-top:2px;"
                  >Cancelled on {{order.date | date}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/4 mt-10 lg:pr-20 w-full px-3 mb-8">
        <div class="w-full flex flex-wrap justify-between pb-2 relative text-sm font-semibold tracking-widest">SHIPPING ADDRESS</div>
        <div class="shadow bg-white p-4 rounded leading-loose text-sm text-gray-700">
          <div>{{order.address.firstName}} {{order.address.lastName}}</div>
          <div>{{order.address.address}}</div>
          <div>{{order.address.city}}</div>
          <div>{{order.address.state}} {{order.address.zip}}</div>
        </div>

        <p class="text-black mt-4 font-normal text-sm font-semibold tracking-widest">PAYMENT SUMMERY</p>
        <div class="text-sm right-0 pb-3 leading-loose shadow bg-white mt-2 rounded p-4">
          <div class="border-b border-gray-300 text-gray-700">
            <div class="flex justify-between mt-1">
              <div>Total item price</div>
              <div>{{order.amount.subtotal | currency}}</div>
            </div>
            <div
              class="flex justify-between mt-1"
              v-if="order.amount.discount > 0 "
            >
              <div>Item discount</div>
              <div>-{{order.amount.discount | currency}}</div>
            </div>
            <div class="flex justify-between mt-1">
              <div>Shipping fee</div>
              <div>{{order.amount.shipping | currency}}</div>
            </div>
            <div class="flex justify-between mt-2 font-bold">
              <div>Total</div>
              <div>{{order.amount.total | currency}}</div>
            </div>
          </div>
          <div class="my-2 text-gray-700 text-sm font-semibold text-black-400">
            <span class="text-semibold text-xs">PAYMENT MODE</span>
            <br />
            <div class="flex text-xs justify-between mt-1">
              <div>Cash on delivery</div>
              <div>{{order.amount.total | currency}}</div>
            </div>
            <!-- <div class="flex justify-center">
              <button class="text-center px-12 ml-2 mt-2 py-1 bg-gray-300 rounded-full focus:outline-none">₹689 due</button>
            </div> -->
          </div>
        </div>
        <div class="flex-no-wrap justify-center mt-3 text-center rounded shadow bg-white p-2 border-b border-gray-200 text-gray-700 text-sm">
          <div>
            <img
              src="/help.png"
              class="m-auto"
              alt=""
            />
          </div>
          <div>Need help with this order?</div>
          <br />
          <div>
            <nuxt-link
              to="/help"
              class="text-pink-500"
            >Visit our help center</nuxt-link>
          </div>
        </div>
      </div>
      <div class="w-8"></div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let order = null,
      err = null;
    if (store.getters["cart/getTotal"] <= 0) {
      redirect("/");
    }
    try {
      order = await $axios.$get(`api/orders/my/${route.params.id}`);
      err = null;
    } catch (e) {
      order = null;
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
    }
    return { order };
  }
};
</script>

<style scoped>
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
  font-size: 2rem;
}
</style>