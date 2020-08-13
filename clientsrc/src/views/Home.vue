<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button
      @click="selectSong(result)"
      class="btn btn-outline-success m-1"
      v-for="result in trackResults"
      :key="result.id"
    >{{result.artists[0].name}} {{result.name}}</button>
    <iframe
      :src="embedLink"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      embedLink:
        "https://open.spotify.com/embed/playlist/2UNpktNwXukadEOfLoLvz3",
    };
  },
  computed: {
    trackResults() {
      return this.$store.state.trackSearchResults;
    },
  },
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch("getSpotifyVisitorAuth");
    this.$store.dispatch("getSpotifyHostAuth");
  },
  methods: {
    selectSong(trackInput) {
      let type = trackInput.uri.split(":")[1];
      let code = trackInput.uri.split(":")[2];
      this.embedLink = "https://open.spotify.com/embed/" + type + "/" + code;
    },
  },
};
</script>
