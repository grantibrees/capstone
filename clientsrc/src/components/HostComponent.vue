<template>
  <div class="host-component mt-5">
    <button @click="play">play</button>
  </div>
</template>
<script>
export default {
  name: "FileName" /*  */,
  data() {
    /* Data binding. */
    return {
      deviceId: "",
    };
  },
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // You can now initialize Spotify.Player and use the SDK
    };
    console.log("hostComponent loaded");
    this.checkForActiveSong();
  } /* Runs functions on startup */,
  computed: {
    accessToken() {
      return this.$store.state.hostTokens.accessToken;
    },
  } /* Pulls values from the store. Always the value of the method that's in it. The live value. Constant value, has to have a return in it, it's a getter. It's like a listener, listening to the state. It gets the state.
      cars() {
      return this.store.state.cars;
  */,
  mounted() {
    this.initiatePlayer();
  },
  methods: {
    waitForSpotifyWebPlaybackSDKToLoad: async function () {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }
      });
    },
    initiatePlayer: async function () {
      const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
      const player = new Player({
        name: "Capstone Web Player",
        volume: 1.0,
        getOAuthToken: (callback) => {
          callback(this.accessToken);
        },
      });
      console.log(JSON.stringify(player));
      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.log("Initialization_error: " + message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.log("Authentication_error: " + message);
      });
      player.addListener("account_error", ({ message }) => {
        console.log("Account_error: " + message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.log("Playback_error: " + message);
      });
      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        // Update UI information on player state changed
      });
      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device Id: ", device_id);
        this.$store.dispatch("getDeviceId", device_id);
      });
      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Not ready with device Id: ", device_id);
      });
      player.connect();
    },
    play() {
      this.$store.dispatch("playCurrentSong");
    },
  } /* Functions that DO things, Commit and Dispatch */,
  components: {} /* Pulls a components file as a child to reference. Often like a for A=[]\
  ÷*/,
};
</script>

<style scoped>
</style>