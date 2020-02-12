<template>
  <div>
    <div class="bg-gray-100 xs:mobile-login h-full px-4">
      <div class="container mx-auto h-full flex items-center">
        <div class="lg:w-1/3 w-full">
                <p
                  class="err"
                  v-if="err"
                >{{err}}</p>
                <p
                  class="success"
                  v-else-if="success"
                >{{success}}</p>
                <p
                  class="info"
                  v-else
                >Type in your Phone / Email below and we'll send you  instructions on how to create a new password</p>
          <div class="border-teal border-t-12 bg-white mb-6 rounded shadow-2xl">
            <div class="p-0 secondary text-white rounded rounded-b-none">
              <h1 class="text-xl mb-6 text-left p-3">
                <span class="font-extrabold">FORGOT PASSWORD</span>
              </h1>
               
            </div>
            <form
              novalidate
              autocomplete="off"
              @submit.stop.prevent="submit()"
              class="center"
            >
              <div class="p-6">
                <div>
                  <Textbox
                    v-model="email"
                    label="Email"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex items-center justify-center h-14 text-lg outline-none w-full font-bold py-2 rounded"
                    :class="{'primary text-white':!loading,'border border-gray-400 bg-gray-300':loading}"
                  >
                    <div v-if="loading">
                      <img
                        src="/loading.svg"
                        :class="{'loading':loading}"
                        alt=""
                      />
                    </div>
                    <span v-else>Send Password Reset Email</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "~/components/ui/Textbox";
export default {
  data() {
    return {
      loading: false,
      fadeIn: "",
      disable: "disable",
      email: "",
      msg:null,
      err:null,
      success:null
    };
  },
  components: { Textbox },
  computed: {
    isEmail() {
      if (this.email.includes("@")) return true;
      else return false;
    },
  },
  methods: {
    async submit() {
      if (!this.email || this.email == "") {
        this.$store.commit("setErr", "Please enter your email id");
        return;
      }
      else if (!this.isEmail) {
        this.$store.commit("setErr", "Entered email is not valid");
        return;
      }
      else {
        await this.resetPassword();
      }
    },
    async resetPassword() {
        try {
          this.loading = true;
          this.success =  await this.$store.dispatch("auth/forgotPassword", { email: this.email });
        } catch (e) {
          this.err = e.response && e.response.data;
          this.$store.commit("setErr", this.err, { root: true });
        } finally {
          this.loading = false;
        }
    }
  },
  head() {
    return {
      title: "Forgot Password - Litekart",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Forgot Password"
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content:
            "Forgot Password"
        },

        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Forgot Password"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Forgot Password"
        },
        {
          name: "twitter:description",
          content:
            "Forgot Password"
        }
      ]
    };
  }
};
</script>
<style scoped>
.info {
  text-align: center;
  max-width: 450px;
  margin: 15px auto;
  line-height: 1.5;
}
.success {
  background-color: lightyellow;
  padding: 20px;
  font-weight: bold;
  text-align: center;
  max-width: 450px;
  margin: 15px auto;
  line-height: 1.5;
}
.err {
  text-align: center;
  max-width: 450px;
  margin: 15px auto;
  line-height: 1.5;
  color: red;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
</style>