<template>
  <div>
    <div
      class="text-xl text-center font-bold bg-white py-3"
      v-if="loading"
    >Searching Order</div>
    <h1
      class="text-xl text-center font-bold bg-white py-3"
      v-else-if="!order"
    >Order Not Found</h1>
    <div v-else>
      <Heading title="Success" />
      <div class="px-8 text-lg tracking-wider">
        <!-- <div class="flex justify-center py-6">
        <img src="seattle.jpg" class="h-40 w-40 rounded-full" />
      </div> -->
        <div
          class="text-gray-500 py-2 flex items-center"
          :class="{'text-green-500':active('Waiting for confirmation')}"
        >
          <div
            class="list-avatar bg-green-500"
            v-if="active('Waiting for confirmation')"
          >0</div>
          <div
            class="list-avatar bg-gray-500"
            v-else
          >1</div>
          <i class="fa fa-tick" /> Waiting for Confirmation
        </div>
        <div
          class="text-gray-500 py-2 flex items-center"
          :class="{'text-green-500':active('Food is being prerared')}"
        >
          <div
            class="list-avatar bg-green-500"
            v-if="active('Food is being prerared')"
          >0</div>
          <div
            class="list-avatar bg-gray-500"
            v-else
          >2</div>
          Food is being prerared
        </div>
        <div
          class="text-gray-500 py-2 flex items-center"
          :class="{'text-green-500':active('Out for delivery')}"
        >
          <div
            class="list-avatar bg-green-500"
            v-if="active('Out for delivery')"
          >0</div>
          <div
            class="list-avatar bg-gray-500"
            v-else
          >3</div>
          <i class="fa fa-bowl" /> Out for delivery
        </div>
        <div
          class="text-gray-500 py-2 flex items-center"
          :class="{'text-green-500':active('Delivered')}"
        >
          <div
            class="list-avatar bg-green-500"
            v-if="active('Delivered')"
          >0</div>
          <div
            class="list-avatar bg-gray-500"
            v-else
          >4</div>
          <i class="fa fa-tick" /> Delivered
        </div>
      </div>
      <div class="py-2 text-center">
        <nuxt-link
          to="/live"
          class="inline-block bg-orange-500 mt-8 mb-2 text-white rounded-full py-2 px-8"
        >
          Order more
        </nuxt-link>
      </div>
      <!-- <nuxt-link to="/orders" class="block text-gray-500 mb-10 mt-2"
      >Go to orders</nuxt-link
    > -->
    </div>
    <div>
      <HereMap
        ref="map"
        lat="18.732447"
        lng="82.829516"
        width="100"
        height="300px"
      />
    </div>
  </div>
</template>
<script>
import Heading from "~/components/Heading";
import HereMap from "~/components/HereMap";
export default {
  components: { Heading, HereMap },
  data() {
    return {
      order: null,
      loading: false
    };
  },
  computed: {},
  methods: {
    active(predicate) {
      return this.order.status == predicate;
    }
  },
  async created() {},
  async mounted() {
    try {
      this.loading = true;
      this.order = await this.$axios.$get(
        `api/food-orders/${this.$route.query.id}`
      );
      this.$refs.map.route(
        `${this.order.delivery.start.lat},${this.order.delivery.start.lng}`,
        `${this.order.delivery.finish.lat},${this.order.delivery.finish.lng}`
      );
      // this.$refs.map.route(`18.732447,82.829516`, `18.708187,82.852198`);
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
};
</script>
