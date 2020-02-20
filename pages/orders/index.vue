<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Today's Orders</div>
    <button
      @click="printOut()"
      class="noprint fab top-0"
    >
      <i class="fa fa-print" />
    </button>
    <div>
      <div class="flex noprint justify-center text-gray-600">
        <h2>{{ todayTotal.count }}</h2>
        <h1>{{ todayTotal.total | currency }}</h1>
        <div>{{ orders && orders[0] && orders[0].createdAt | date }}</div>
      </div>
      <div
        v-for="s in todaySummary"
        :key="s._id"
        class="noprint text-center"
      >
        <span class="font-bold">
          {{ s._id }} *
          <span class="text-green-500 text-xl">{{ s.count }}</span> =
          <span class="text-red-500 text-xl">
            {{
            s.amount | currency
            }}
          </span>
        </span>
      </div>
      <ul class="flex flex-wrap">
        <li
          class="shadow-2xl rounded p-4 w-full lg:w-1/4 xl:w-1/5"
          v-for="(o, ix) in orders"
          :key="ix"
        >
          <h1 class="text-3xl font-black text-red-500">QrNo: {{ o.address.qrno }}</h1>
          <p class="font-bold">
            {{ o.address.firstName }} - {{ o.address.lastName }} ({{
            o.address.phone
            }})
          </p>
          <ul v-if="o.item">
            <ol class="flex">
              <div class="mr-2 shadow-xl font-bold w-8 h-8 rounded-full bg-gray-300 text-center align-middle">1</div>
              <div class>{{ o.item.name }}</div>
            </ol>
          </ul>
          <p>
            {{ o.rate | currency }} * {{ o.qty }} =
            <span class="text-3xl font-bold">{{ o.amount | currency }}</span>
          </p>
          <h3
            v-if="o.vendor"
            class="text-right tracking-wide"
          >{{ o.vendor.restaurant }}</h3>
          <div class="text-cyan-500 text-xs text-right">{{ o.createdAt | date }}</div>
        </li>
      </ul>
    </div>
    <StickyFooter />
    <!-- <nuxt-link to="/my/food/customers/old/" class="noprint">Old Customers</nuxt-link> -->
  </div>
</template>
<script>
const Header = () => import("~/components/Header");
const StickyFooter = () => import("~/components/footer/StickyFooter");
// import io from "socket.io-client";
// import { WS_URL } from "~/config";
// let socket = io(WS_URL);
export default {
  async asyncData({ $axios }) {
    let orders = [],
      status = "Received",
      todayTotal = null,
      todaySummary = null;
    try {
      orders = await $axios.$get("api/food-orders/pending");
      todayTotal = await $axios.$get("api/food-orders/my/today");
      todaySummary = await $axios.$get("api/food-orders/todays-summary");
    } catch (e) {}
    return { orders: orders.data, todayTotal, todaySummary };
  },
  async created() {
    let axios = this.$axios;
    let vm = this;
    // socket.on("food-order" + ":save", async function(item) {
    //   vm.orders = await axios.$get("food-orders/my-customers");
    // });
  },
  components: { Header, StickyFooter },
  methods: {
    printOut() {
      if (process.client) {
        window.print();
      }
    },
    async save(o) {
      try {
        this.$store.commit("busy", true);
        await this.$axios.$put("api/food-orders/" + o._id, {
          status: o.status
        });
        this.$store.commit("busy", false);
      } catch (e) {
        this.$store.commit("busy", false);
      }
    },
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.heading {
  text-align: center;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.175) !important;
  margin-bottom: 0.5rem;
  padding: 1rem 0;
  font-size: 2rem;
}
p {
  margin-bottom: 0.8rem !important;
}
.g {
  color: green;
}
.r {
  color: red;
}
.big {
  font-weight: 700;
  font-size: 2rem;
}
h1 {
  margin: 0px 0px 10px 0px;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  /* border-bottom: 1px solid grey; */
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
  width: 330px;
}
.p-left {
  padding-left: 0px;
}
.font {
  padding-left: 1rem;
}
.seller {
  font-size: 1.4rem;
}
.customer {
  padding: 1rem;
  font-size: 1.2rem;
  color: blue;
  font-weight: 500;
}
.font {
  font-size: 0.7rem;
  padding-left: 0.5rem !important;
  font-weight: 900;
}
</style>
