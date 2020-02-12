<template>
  <div>
    <button @click="locateMe">Get location</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null
    };
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.$store.commit("busy", true);
      this.gettingLocation = true;
      try {
        this.$store.commit("busy", false);
        this.gettingLocation = false;
        this.location = await this.getLocation();
      } catch (e) {
        this.$store.commit("busy", false);
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    }
  }
};
</script>

<style></style>
