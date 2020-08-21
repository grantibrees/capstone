<template>
  <div id="app">
    <div class="spacing"></div>
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.spacing {
  height: 50px;
}
</style>
