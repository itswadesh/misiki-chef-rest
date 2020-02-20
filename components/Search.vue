<script>
</script>
<template>
  <form
    novalidate
    autocomplete="off"
    @submit.stop.prevent="submit(search)"
  >
    <div class="absolute">
      <i
        class="fa fa-search m-3 text-gray-500"
        aria-hidden="true"
      />
    </div>
    <input
      type="text"
      v-model="$route.query.q"
      class="w-full px-10 bg-purple-white pr-4 border border-gray-200 rounded-full    border-0 h-10 focus:outline-none text-xs shadow"
      placeholder="Search for items"
      name="search"
    />
  </form>
</template>

<script>
import { typingTimeout } from "~/config";
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`);
    },
    go(url) {
      this.$router.go(-1);
    }
  },
  created() {
    this.search = this.$route.params.q;
  },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return; // Do not trigger on page load
        clearTimeout(this.typingTimer);
        let vm = this;
        this.typingTimer = setTimeout(function() {
          if (!value || value == "undefined") value = ""; // When clear button clicked
          vm.searchString = value;
          vm.$router.push(`/search/${value}`);
        }, typingTimeout);
      }
    },
    "$route.query.q": {
      immediate: true,
      handler(value) {
        let pathName = null;
        if (this.$route.name) pathName = this.$route.name.substr(0, 8);
        if (pathName === "category") return;
        if (!value || value == "undefined") value = "";
        if (value == "") return;
        if (this.search == "") this.search = value;
      }
    }
  }
};
</script>

<style scoped>
img {
  margin-right: 1rem;
}
</style>