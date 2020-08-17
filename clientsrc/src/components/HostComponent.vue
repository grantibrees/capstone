<template>
  <div class="host-component"></div>
</template>
<script>
export default {
  name: "FileName" /*  */,
  data() {
    /* Data binding. */
    return {};
  },
  mounted() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      // You can now initialize Spotify.Player and use the SDK
    };
    console.log("hostComponent loaded");
    this.checkForActiveSong();
  } /* Runs functions on startup */,
  computed: {} /* Pulls values from the store. Always the value of the method that's in it. The live value. Constant value, has to have a return in it, it's a getter. It's like a listener, listening to the state. It gets the state.
      cars() {
      return this.store.state.cars;
  */,
  methods: {
    checkForActiveSong() {
      // if (this.$store.state.activeSong) {
      this.playSong();
      // }
    },
    playSong() {
      window.onSpotifyPlayerAPIReady = () => {
        const player = new Spotify.Player({
          name: "Web Playback SDK Template",
          // getOAuthToken: (cb) => {
          //   cb(this.$store.state.hostTokens);
          // },
        });
        player.on("initialization_error", (e) => console.error(e));
        player.on("authentication_error", (e) => console.error(e));
        player.on("account_error", (e) => console.error(e));
        player.on("playback_error", (e) => console.error(e));

        player.on("player_state_changed", (state) => {
          console.log(state);
          $("#current-track").attr(
            "src",
            state.track_window.current_track.album.images[0].url
          );
          $("#current-track-name").text(state.track_window.current_track.name);
        });
        // Ready
        player.on("ready", (data) => {
          console.log("Ready with Device ID", data.device_id);

          // Play a track using our new device ID
          play(data.device_id);
        });

        // Connect to the player!
        player.connect();
      };

      // Play a specified track on the Web Playback SDK's device ID
      function play(device_id) {
        $.ajax({
          url:
            "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
          type: "PUT",
          data: '{"uris": ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"]}',
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + _token);
          },
          success: function (data) {
            console.log(data);
          },
        });
      }
    },
  } /* Functions that DO things, Commit and Dispatch */,
  components: {} /* Pulls a components file as a child to reference. Often like a for A=[]\
  ÷*/,
};
</script>

<style scoped>
</style>