<template>
  <div>
    <Heading title="My Dishes" />
    <div
      class="container"
      v-if="user && user.verified"
    >
      <!-- <button
        class="button-lg blue"
        style="margin-bottom:20px"
        @click="go('/my/food/dishes/new')"
      >Add New</button>-->
      <!-- <v-pagination
        v-if="noOfPages>1"
        v-model="currentPage"
        @input="changePage(currentPage)"
        :length="noOfPages"
        :total-visible="10"
        circle
      ></v-pagination>-->
      <Search />
      <div class="flex flex-wrap mx-1 mt-2">
        <div
          v-for="d in data"
          :key="d.id"
          @click="go('/foods/'+d.id)"
          class="w-1/2 shadow bg-gray-100 mb-2"
        >
          <img
            v-lazy="d.img"
            class="h-32 bg-cover w-full border-b"
          />
          <!-- <div class="delete-icon">
                    <v-icon>delete</v-icon>
          </div>-->
          <div class="p-3">
            <div class="flex justify-between items-center">
              <div
                class="text-red-500"
                v-if="d.stock>0"
              >Only {{d.stock}} left</div>
              <div
                class="text-green-500"
                v-else
              >Sold out</div>
              <img
                v-if="d.type=='N'"
                src="/non-veg.png"
                class="w-5 h-5"
              />
              <img
                v-else
                src="/veg.png"
                class="w-5 h-5"
              />
            </div>
            <div class="p-name">{{d.name}}</div>
          </div>
        </div>
      </div>
      <nuxt-link
        class="fab top-0 mt-1"
        to="/foods/new"
      >
        <i
          class="fa fa-plus"
          aria-hidden="true"
        ></i>
      </nuxt-link>
    </div>
    <div
      v-else
      class="mx-atuo justify-center flex flex-col text-center align-middle h-72 items-center"
    ><i
        class="fa fa-history text-gray-700 mb-2 text-primary"
        style="font-size:4rem"
      />
      You must be verified by admin to add new Dish</div>
    <StickyFooter />
  </div>
</template>
<script>
import Heading from "~/components/Heading";
import StickyFooter from "~/components/footer/StickyFooter";
import Search from "~/components/Search";
import { query, search, pagination } from "~/mixins";
import getProducts from "~/gql/product/products.gql";
import me from "~/gql/user/me.gql";

export default {
  middleware: "isAuth",
  mixins: [query, search, pagination],
  components: { Heading, Search, StickyFooter },
  data() {
    return {
      data: null,
      user: null
    };
  },
  async created() {
    try {
      const res = (await this.$apollo.query({ query: getProducts })).data;
      this.data = res.products;
      const r = (await this.$apollo.query({ query: me })).data;
      this.user = r.me;
    } catch (e) {
      console.error("err... ", e);
    }
  },
  layout: "none",
  head() {
    return {
      title: "Post Your Food"
    };
  }
};
</script>
<style scoped>
.big-button {
  text-transform: initial;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border-color: #fb6340;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
  font-family: Karla, Roboto, sans-serif;
}
.big-button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.listingcard {
  /* height: 29vh;  */
  border-radius: 0.2rem;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: 156px;
}
@media (min-width: 650px) {
  .listingcard {
    height: 22vh;
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
}

.a-listing {
  display: flex;
  flex-direction: column;
}
.p-name {
  line-height: 1.2rem;
}
.align-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
}
/* @media (min-width:300px) and (max-width:800px ) {
     .align-row{
        display: flex;
    flex-direction: row;
    } 
    } */
.name {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pinky {
  color: rgb(255, 0, 104);
  letter-spacing: 1px;
}

/* .time {
  font-size: 0.8rem;
  color: #eee;
} */
.delete-icon {
  margin-top: -9rem;
  margin-left: 8rem;
}
.greenclr {
  color: green;
}
</style>

