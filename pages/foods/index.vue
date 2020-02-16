<template>
  <div>
    <Heading title="My Dishes" />
    <div
      class="container fx center"
      v-if="user && user.verified"
    >

      <!-- <button
        class="button-lg blue"
        style="margin-bottom:20px"
        @click="go('/my/food/dishes/new')"
      >Add New</button> -->
      <!-- <v-pagination
        v-if="noOfPages>1"
        v-model="currentPage"
        @input="changePage(currentPage)"
        :length="noOfPages"
        :total-visible="10"
        circle
      ></v-pagination> -->
      <Search />
      <div class="align-row">
        <div
          v-for="d in data"
          :key="d._id"
          @click="go('/my/food/dishes/'+d._id)"
          class="listingcard"
        >
          <div class="a-listing">
            <div class="height ">
              <img
                v-lazy="d.img"
                class="backgroundimg"
              />
              <!-- <div class="delete-icon">
                    <v-icon>delete</v-icon>
                </div> -->
            </div>
            <div class="card-container">
              <div class="a-contain">
                <div
                  class="pinky"
                  v-if="d.stock>0"
                >Only {{d.stock}} left</div>
                <div
                  class="greenclr"
                  v-else
                > Sold out</div>
                <img
                  v-if="d.type=='N'"
                  src="/non-veg.png"
                  class="image-size"
                />
                <img
                  v-else
                  src="/veg.png"
                  class="image-size"
                />
              </div>
              <div class="p-name">{{d.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link
        class="fab"
        to="/foods/new"
      >
        <i
          class="fa fa-plus "
          aria-hidden="true"
        ></i>
      </nuxt-link>
    </div>
    <div
      v-else
      class="text-center"
    >You must be verified by admin to add new Dish</div>
  </div>
</template>
<script>
import Heading from "~/components/Heading";
import Search from "~/components/Search";
import { query, search, pagination } from "~/mixins";

export default {
  fetch({ store, redirect }) {
    if (!store.getters["auth/hasRole"]("chef")) return redirect("/login");
  },
  mixins: [query, search, pagination],
  components: { Heading, Search },
  data() {
    return { loading: false, foods: [], apiQ: "foods/my" };
  },
  layout: "none",
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  head() {
    return {
      title: "Post Your Food"
    };
  }
};
</script>
<style scoped>
body {
  font-family: Oswald;
}
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
.image-size {
  width: 1.5rem;
  height: 1.5rem;
}
.a-contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.card-container {
  /* padding: 0.4rem; */
  padding-top: 7.5rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.4rem;
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

