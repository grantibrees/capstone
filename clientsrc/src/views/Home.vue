<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <a class="btn btn-primary" :href="url">Host a Session</a>
    <button @click="movePage('Session')" class="btn btn-info">go to session</button>
    <button
      @click="selectSong(result)"
      class="btn btn-outline-success m-1"
      v-for="result in trackResults"
      :key="result.id"
    >{{result.artists[0].name}} {{result.name}}</button>
    <iframe
      @click="console.log('music clicked')"
      id="music-player"
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
    url() {
      return location.origin.includes("localhost")
        ? "//localhost:3000/login"
        : "/login";
    },
  },
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch("getSpotifyVisitorAuth");
    // this.startMusic();
  },
  methods: {
    selectSong(trackInput) {
      let type = trackInput.uri.split(":")[1];
      let code = trackInput.uri.split(":")[2];
      this.embedLink = "https://open.spotify.com/embed/" + type + "/" + code;
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
    async startSession() {
      let res = await fetch("http://localhost:3000/login");
      let { url } = await res.json();
      console.log(url);
    },
  },
};
</script>
