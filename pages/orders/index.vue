<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Today's Orders</div>
    <button @click="printOut()" class="noprint fixed fab top-0">
      <i class="fa fa-print" />
    </button>
    <div v-if="orders">
      <div class="bg-yellow-200 p-2 flex justify-between noprint items-center text-gray-600">
        <h2>{{ orders.myToday.count }}</h2>
        <div class="text-red-500 font-bold">{{ orders.myToday.amount | currency }}</div>
        <div>{{ orders.myToday.createdAt | date }}</div>
      </div>
      <ul class="flex flex-wrap">
        <li
          class="shadow-2xl rounded p-4 w-full lg:w-1/4 xl:w-1/5"
          v-for="(o, ix) in orders.myCustomers.data"
          :key="ix"
        >
          {{o._id.orderNo}}
          <h1 class="text-xl font-black text-red-500">QrNo: {{ o._id.address.address }}</h1>
          <p
            class="font-bold"
          >{{ o._id.address.firstName }} {{ o._id.address.lastName }} ({{ o._id.user.phone }})</p>
          <ul v-if="o.items">
            <ol class="flex flex-col" v-for="(i,ix) in o.items" :key="i._id">
              <div class="flex justify-between items-center">
                <div
                  class="mr-2 shadow-xl font-bold w-8 h-8 rounded-full bg-gray-300 text-center align-middle flex justify-center items-center"
                >{{ix+1}}</div>
                <div class>
                  <div class="text-2xl">{{i.name }}</div>
                  <div>
                    {{ i.price | currency }} * {{ i.qty }} =
                    <span
                      class="text-3xl font-bold"
                    >{{ i.price*i.qty | currency }}</span>
                  </div>
                </div>
              </div>
              <select v-model="i.status" class="px-4" @change="save(o._id.id, i.pid, i.status)">
                <option v-for="(s,ix) in orders.settings.orderStatuses" :key="ix">{{s}}</option>
              </select>
            </ol>
          </ul>
          <!-- <h3 v-if="o.vendor" class="text-right tracking-wide">{{ o.vendor.restaurant }}</h3> -->
          <div class="text-cyan-500 text-xs text-right">{{ o._id.createdAt | date }}</div>
        </li>
      </ul>
    </div>
    <StickyFooter />
    <!-- <nuxt-link to="/my/food/customers/old/" class="noprint">Old Customers</nuxt-link> -->
  </div>
</template>
<script>
const Header = () => import('~/components/Header')
const StickyFooter = () => import('~/components/footer/StickyFooter')
import myCustomers from '~/gql/order/myCustomers.gql'
import updateOrder from '~/gql/order/updateOrder.gql'
import { infiniteScroll } from '~/mixins'

export default {
  middleware: 'isAuth',
  mixins: [infiniteScroll],
  data() {
    return {
      orders: null,
      model: myCustomers,
      attr: 'myCustomers'
    }
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.orders = (
        await this.$apollo.query({
          query: myCustomers,
          variables: {},
          fetchPolicy: 'no-cache'
        })
      ).data
    } catch (e) {
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: { Header, StickyFooter },
  methods: {
    printOut() {
      if (process.client) {
        window.print()
      }
    },
    async save(id, pid, status) {
      try {
        this.$store.commit('clearErr')
        await this.$apollo.mutate({
          mutation: updateOrder,
          variables: { id, pid, status },
          fetchPolicy: 'no-cache'
        })
        this.orders = (
          await this.$apollo.query({
            query: myCustomers,
            variables: {},
            fetchPolicy: 'no-cache'
          })
        ).data
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    go(url) {
      this.$router.push(url)
    }
  }
}
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
