<template>
  <div>
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="geo">
      Your location data is {{ geo.lat }},
      {{ geo.lng }}
      {{ geo.country }}
      {{ geo.state }}
      {{ geo.state_district }}
      {{ geo.county }}
      {{ geo.postcode }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorStr: "",
      gettingLocation: false,
      geo: null,
      location: { latitude: "", longitude: "" }
    };
  },
  created() {
    this.geo = this.$cookies.get("geo");
    if (!this.geo) {
      this.locateMe();
    }
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
      try {
        this.$store.commit("busy", false);
        this.location = (await this.getLocation()).coords;
        this.geo = await this.$axios.$get(
          //   `/api/geo/location?lat=${this.location.latitude}&lng=${this.location.longitude}`
          `/api/geo/location?lat=18.722615&lng=82.839649`
        );
        this.geo.lat = this.location.latitude;
        this.geo.lng = this.location.longitude;
        console.log("Geo...", this.geo);
        this.$cookies.set("geo", this.geo, { path: "/" });
      } catch (e) {
        this.$store.commit("busy", false);
        this.$toast.show(e.message);
      }
    },
    showInMap(pos) {
      var latlon = pos.coords.latitude + "," + pos.coords.longitude;

      var img_url =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        latlon +
        "&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";
      var map = document.querySelector("mapholder");
      map.innerHTML = "<img src='" + img_url + "'>";
    }
  }
};
</script>

<style></style>
