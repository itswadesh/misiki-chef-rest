<template>
  <div>
    <Heading title="Kitchen Photos" />
    <div v-if="info" class="container">
      <h1 class="text-xl font-bold text-center text-gray-700">{{ info.restaurant }}</h1>
      <ImageUpload name="kitchen" folder="kitchen" @remove="remove" @save="save" />
      <div class="flex flex-wrap mx-1 mt-2">
        <div
          v-for="(d, ix) in info.kitchenPhotos"
          :key="ix"
          class="w-1/2 p-2 self-stretch shadow relative px-1 bg-gray-100 mb-2"
        >
          <button
            type="button"
            @click="remove(d)"
            class="w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-200 absolute top-0 right-0"
          >
            <i class="fa fa-close" />
          </button>
          <img v-lazy="d" class="h-32 bg-cover w-full border-b" />
        </div>
      </div>
    </div>
    <div v-else>Please update restaurant info in profile</div>
    <StickyFooter />
  </div>
</template>
<script>
import Heading from "~/components/Heading";
import StickyFooter from "~/components/footer/StickyFooter";
import ImageUpload from "~/components/ImageUpload";

export default {
  fetch({ store, redirect }) {
    if (!store.getters["auth/hasRole"]("chef")) return redirect("/login");
  },
  components: { Heading, ImageUpload, StickyFooter },
  data() {
    return { loading: false, kitchenPhotos: [], info: null };
  },
  layout: "none",
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    save(name, image) {
      this.info.kitchenPhotos = this.info.kitchenPhotos || [];
      this.info.kitchenPhotos = [...this.info.kitchenPhotos, ...image];
      this.submit(this.info);
    },
    remove(name) {
      this.$swal({
        title: "Delete address?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.info.kitchenPhotos = this.info.kitchenPhotos.filter(function(
            value,
            index,
            kf
          ) {
            return value != name;
          });
          this.submit(this.info);
        }
      });
    },
    async submit(info) {
      this.$store.commit("busy", true);
      try {
        const data = await this.$axios.$put("api/users/profile", { info });
        this.getData();
      } catch (e) {
      } finally {
        this.$store.commit("busy", false);
      }
    },
    async getData() {
      let params = this.$route.query;
      this.$store.commit("busy", true);
      try {
        let { info } = await this.$axios.$get(`api/users/me`);
        this.info = info;
      } catch (e) {
        this.$store.commit("setErr", e);
      } finally {
        this.$store.commit("busy", false);
      }
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
