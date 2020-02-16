<template>
  <div>
    <Heading title="Chef Details" />
    <div class="w-full pb-4 lg:w-1/3 m-auto">
      <form
        class="lg:mx-15 form w-full mb-1"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(a)"
      >
        <div class="p-2">
          <div
            label="Phone"
            class="w-full text-center mb-4"
            name="name"
          >Phone: {{a.phone}}
          </div>
          <div class="w-full flex justify-between">
            <Textbox
              label="First Name"
              class="w-full"
              name="firstName"
              v-model="a.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-full"
              name="lastName"
              v-model="a.lastName"
            />
          </div>
          <Textbox
            label="Address"
            class="w-full"
            name="name"
            v-model="a.address"
          />
          <Textbox
            label="Pin Code"
            class="w-full"
            name="name"
            v-model="a.zip"
          />
          <Textbox
            label="Town"
            class="w-full"
            name="name"
            v-model="a.town"
          />
          <div class="w-full flex justify-between">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="a.state"
            />
          </div>

        </div>
        <div class="flex shadow lg:shadow-none fixed lg:relative bottom-0 justify-between w-full">
          <button
            type="button"
            @click="$router.push('/checkout/address')"
            class="tracking-widest p-3 w-1/2 bg-white text-black text-sm font-semibold lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="tracking-widest p-3 w-1/2 primary text-sm font-semibold lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const Heading = () => import("~/components/Heading");
const Textbox = () => import("~/components/ui/Textbox");
import { geo } from "~/mixins";
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/checkout/add");
  },
  mixins: [geo],
  data() {
    return {
      a: {}
    };
  },
  components: {
    Heading,
    Textbox
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  async created() {
    try {
      this.$store.commit("busy", true);
      // const me = await this.$axios.$get(`api/me`);
      this.a = await this.locateMe();
      this.a.address = this.user.address.address || this.a.address;
      this.a.town = this.user.address.county || this.a.county;
      this.a.city = this.user.address.city || this.a.state_district;
      this.a.zip = this.user.address.zip || this.a.postcode;
      this.a.firstName = this.user.address.firstName || this.user.firstName;
      this.a.lastName = this.user.address.lastName || this.user.lastName;
      this.a.phone = this.user.phone;
      this.$store.commit("busy", false);
    } catch (e) {
    } finally {
      this.$store.commit("busy", false);
    }
  },
  methods: {
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    go(url) {
      this.$router.push(url);
    },
    async submit(address) {
      this.$store.commit("busy", true);
      try {
        await this.updateProfile({ address });
        this.$store.commit("busy", false);
        this.go("/foods");
      } catch (e) {
        this.$store.commit("busy", false);
      }
    }
  },
  layout: "none"
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
</style>
