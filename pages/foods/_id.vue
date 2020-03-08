<template>
  <div>
    <Heading title="Add food details" />
    <form novalidate autocomplete="off" @submit.stop.prevent="submit()" class="container relative">
      <button
        type="button"
        @click="deleteProduct(food.id)"
        class="absolute right-0 top-0 w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200 z-10"
      >
        <i class="fa fa-close" />
      </button>
      <div class="card shadow columns">
        <br />
        <div class="margin-phn">
          <!-- <v-checkbox
            v-model="food.active"
            @change="submit()"
            label="Open Kitchen"
          />-->
          <Textbox class="w-full mb-4" label="Dish Name" name="name" v-model="food.name" />
          <Textbox
            class="w-full mb-4"
            label="Description"
            name="description"
            v-model="food.description"
          />
          <Textbox class="w-full mb-4" label="Rate" name="rate" v-model="food.rate" />
          <Textbox class="w-full mb-4" label="Qty" name="qty" v-model="food.stock" />
          <div class="mb-4">
            <Radio v-model="food.type" value="V" color="green" class="mr-2">Veg</Radio>
            <Radio v-model="food.type" value="N" color="red" class="mr-2">Non Veg</Radio>
          </div>
          <div class="flex">
            <Radio
              color="secondary"
              v-model="food.time"
              v-for="(s,ix) in deliveryslots"
              :key="ix"
              :value="s.val"
              class="mr-2"
            >{{s.name}} [{{s.val}}]</Radio>
          </div>
          <image-upload
            :image="food.img"
            name="food"
            folder="food"
            @remove="removeImage"
            @save="saveImage"
          />
          <!-- <img
            v-if="food.img"
            v-lazy="IMAGEKIT+'/images'+food.img"
          />-->
          <div class="msg">{{msg}}</div>
          <br />
          <div class="bg-red-200 p-3 rounded" v-if="nwErr || graphErr">
            <ul>
              <li v-for="(e,ix) in nwErr" :key="ix">{{e.message}}</li>
              <li v-for="(e,ix) in graphErr" :key="ix">{{e.message}}</li>
            </ul>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="fixed bottom-0 text-center px-auto py-3 text-xl primary w-full">
        <button class="w-full" type="submit" v-if="$route.params.id == 'new'">Add Dish</button>
        <button class="w-full" type="submit" v-else>Save Changes</button>
      </div>
    </form>
  </div>
</template>
<script>
import { timesList } from '~/config'
const Radio = () => import('~/components/ui/Radio')
const Textbox = () => import('~/components/ui/Textbox')
const Heading = () => import('~/components/Heading')
import ImageUpload from '@/components/ImageUpload'
import product from '~/gql/product/product.gql'
import createProduct from '~/gql/product/createProduct.gql'
import updateProduct from '~/gql/product/updateProduct.gql'
import deleteProduct from '~/gql/product/deleteProduct.gql'
import slots from '~/gql/product/slots.gql'

export default {
  middleware: 'isAuth',
  components: { ImageUpload, Radio, Textbox, Heading },
  data() {
    return {
      loading: false,
      fadeIn: '',
      msg: null,
      err: [],
      nwErr: null,
      graphErr: null,
      deliveryslots: [],
      food: { type: 'V', time: '8:30 - 9:30 PM' },
      date: null,
      menu: false,
      modal: false,
      menuDate: false,
      menuTime: false,
      timesList: timesList,
      dishes: [],
      qty: 5
    }
  },
  async created() {
    if (this.$route.params.id == 'new') return
    try {
      this.$store.commit('busy', true)
      const deliveryslots = (
        await this.$apollo.query({ query: slots, fetchPolicy: 'no-cache' })
      ).data
      this.deliveryslots = deliveryslots.slots
      const food = (
        await this.$apollo.query({
          query: product,
          variables: { id: this.$route.params.id },
          fetchPolicy: 'no-cache'
        })
      ).data
      if (!food.time) food.time = '8:30 - 9:30 PM'
      this.food = food.product
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    async deleteProduct(id) {
      this.$swal({
        title: 'Are you sure to delete this dish?',
        text: 'This will permanently delete including image',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
      }).then(async result => {
        if (result.value) {
          try {
            await this.$apollo.mutate({
              mutation: deleteProduct,
              variables: { id }
            })
            this.$router.push('/search')
          } catch (e) {
            this.$store.commit('setErr', e)
          } finally {
            this.$store.commit('busy', false)
          }
        }
      })
    },
    saveImage(name, image) {
      this.food.img = image
      this.publishDish()

      // this.submit();
    },
    removeImage(name) {
      this.food.img = ''
      this.publishDish()
    },
    // add(qty) {
    //   if (qty < 5 && this.qty <= 0) return;
    //   // if (qty > 0 && this.qty >= 300) {
    //   //   this.$store.commit("setErr", "Sorry! Maximum 300 qty allowed.");
    //   //   return;
    //   // }
    //   this.qty += qty;
    // },
    async submit() {
      const vm = this
      if (!vm.food.name) {
        this.$store.commit('setErr', 'Please name your dish')
        return
      } else if (!vm.food.type) {
        this.$store.commit('setErr', 'Please select Veg or Non Veg')
        return
      } else if (!vm.food.rate || vm.food.rate < 30) {
        this.$store.commit('setErr', 'Rate must be atleast 30')
        return
      }
      try {
        this.loading = true
        this.$store.commit('busy', true)
        // let date = moment(this.date + " " + this.time, "YYYY-MM-DD h a");
        // if (date.diff(moment()) < 0) {
        //   console.log("Delivery time is invalid");
        //   this.$store.commit("setErr", "Delivery time is invalid");
        //   return;
        // }
        // this.food.deliveryDate = date;
        if (this.food.stock == 0) {
          await vm.publishDish()
          // this.$router.push("/search");
        } else if (this.food.stock > 0) {
          this.$swal({
            title: 'Are you sure to activate this dish?',
            text: 'This will be available for booking by users',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Publish!'
          }).then(async result => {
            if (result.value) {
              await vm.publishDish()
              this.$router.push('/search')
            }
          })
        } else {
          this.$store.commit('setErr', 'Quantity must be >= 0')
          return
        }
      } catch (e) {
        this.$store.commit('setErr', e.toString())
        return
      } finally {
        this.$store.commit('busy', false)
        this.loading = false
      }
    },
    async publishDish() {
      try {
        this.$store.commit('busy', true)
        this.$store.commit('clearErr')
        this.food.rate = +this.food.rate
        this.food.stock = +this.food.stock
        if (this.$route.params.id == 'new') {
          await this.$apollo.mutate({
            mutation: createProduct,
            variables: this.food,
            fetchPolicy: 'no-cache'
          })
        } else {
          await this.$apollo.mutate({
            mutation: updateProduct,
            variables: { id: this.$route.params.id, ...this.food },
            fetchPolicy: 'no-cache'
          })
        }
        this.$router.go(-1)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    }
  },
  layout: 'none',
  head() {
    return {
      title: 'Post Your Food'
    }
  }
}
</script>
<style scoped>
.msg {
  font-size: 10px;
  color: #fb6340;
}
.otp-container {
  text-align: center;
}
.phone {
  height: 45px;
  border: 1px solid #da1c5f;
  padding: 5px 10px;
  border-radius: 3px;
}
.otp {
  height: 45px;
  width: 45px;
  font-size: 25px;
  text-align: center;
  border: 1px solid #fff;
  border-bottom: 1px solid #888;
}
.opt::-webkit-inner-spin-button,
.opt::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cart-total-after {
  margin-bottom: 10px;
}
.align {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
h1 {
  font-size: 14px;
  padding-left: 26px;

  color: #3baaec;
}
h5 {
  font-size: 17px;
  margin-top: 0px;
  color: #3baaec;
  text-align: -webkit-center;
}
h3 {
  font-size: 23px;
}
h4 {
  font-size: 14px;
  padding-left: 26px;
  color: #3baaec;
}
.border {
  border: none;
  outline: none;
  padding-top: 10px;
  text-align: -webkit-center;
}
.margin {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 0;
  padding-top: 10px;
}
.margin-phn {
  padding: 0 1rem;
}
textarea {
  height: 60px;
  margin-top: -11px;
}
.padding {
  padding-top: 25px;
}

.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding-left: 0px;
  padding-right: 0px;
  height: auto;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}

.big-button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}

.gray {
  font-size: 23px;
  color: gray;
}
.shadow {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0.7rem 0.7rem 0;
}
.top-padding {
  padding-top: 50px;
  font-size: 17px;
}
.img1 {
  text-align: -webkit-center;
  padding-top: 3px;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

