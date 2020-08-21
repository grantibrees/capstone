<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onAuth } from "@bcwdev/auth0-vue";
window.onSpotifyWebPlaybackSDKReady = () => {
  // You can now initialize Spotify.Player and use the SDK
};
export default {
  name: "App",
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {};
  },
  async beforeCreate() {
    try {
      this.$store.dispatch("initializeSocket");
    } catch (err) {
      console.log("the problem is in app");
      this.$router.push({ name: "home" });
    }
  },
  components: {},
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  font-family: "Alata", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.font-fancy {
  font-family: "Norican", cursive;
}
</style>
