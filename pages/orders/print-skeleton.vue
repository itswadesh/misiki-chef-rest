<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Today's Orders</div>
    <button @click="printOut()" class="noprint">Print</button>
    <div>
      <ul class="p-left fx">
        <li class="card" v-for="(o, ix) in 8" :key="ix">
          <h1 style="color:red">QrNo&nbsp;&nbsp;:</h1>
          <h1 style="color:red">Amount&nbsp;:</h1>
          <p>
            Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </p>
          <p>Aloo Paratha(2nos)</p>
          <h3 style="text-align: right;">Yummy Food - Misiki</h3>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/Header");
// import io from "socket.io-client";
// import { WS_URL } from "~/config";
// let socket = io(WS_URL);
export default {
  async asyncData({ $axios }) {
    let orders = [],
      status = "Received",
      todayTotal = null;
    try {
      orders = await $axios.$get("food-orders/my-customers");
      todayTotal = await $axios.$get("food-orders/my/today");
    } catch (e) {}
    return { orders, todayTotal };
  },
  async created() {
    let axios = this.$axios;
    let vm = this;
    // socket.on("food-order" + ":save", async function(item) {
    //   vm.orders = await axios.$get("food-orders/my-customers");
    // });
  },
  components: { Header },
  methods: {
    printOut() {
      if (process.client) {
        window.print();
      }
    },
    async save(o) {
      try {
        await this.$axios.$put("food-orders/" + o._id, { status: o.status });
      } catch (e) {}
    },
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  color: #000 !important;
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
