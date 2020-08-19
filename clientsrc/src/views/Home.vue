<template>
  <div class="home">
    <div class="mt-5 container font-medieval-wide">
      <h1 class>Welcome To Song Scoop</h1>
      <h3>Where you don't need to steal your friends phone to put on decent music</h3>
      <a class="btn btn-block btn-primary p-5 rounded" :href="url">
        <h1>Host A Session</h1>
      </a>
      <button @click="movePage('SessionJoin')" class="btn btn-block btn-info p-5 rounded">
        <h1>Join A Session</h1>
      </button>
    </div>
    <!-- Currently shows search results, need to add this to proper search and change selectSong() to properly add data to state and play song.  -->

    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#HomeSongModal"
    >Search</button>

    <div id="HomeSongModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Search</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              class="form-inline mr-5"
              @submit.prevent="searchByArtist(),searchByAlbum(),searchBySong()"
            >
              <input
                v-model="search.data"
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div
              class="bg-success m-2 p-2 row justify-content-between rounded-pill"
              v-for="result in trackResults"
              :key="result.id"
            >
              <div class="col-2">
                <img class="ml-5 rounded img-fluid" :src="result.album.images[0].url" alt />
              </div>
              {{result.artists[0].name}}- {{result.name}}
              <button
                class="btn btn-outline-secondary mr-5 rounded-circle col-2"
                @click.prevent="selectSong(result)"
              >+</button>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      search: {},
    };
  },
  computed: {
    trackResults() {
      return this.$store.state.trackSearchResults;
    },
    profileExists() {
      if (this.$store.state.profile) {
        return this.$store.state.profile.email;
      } else {
        return false;
      }
    },
    url() {
      return location.origin.includes("localhost")
        ? "//localhost:3000/login"
        : "/login";
    },
  },
  components: {},
  mounted() {
    this.$store.dispatch("getSpotifyVisitorAuth");
    // this.startMusic();
  },
  methods: {
    selectSong(track) {
      this.$store.dispatch("addToQueue", {
        album: track.album.name,
        songTitle: track.name,
        artist: track.artists[0].name,
        explicit: track.explicit,
        albumCover: track.album.images[0],
        trackLength: track.duration_ms,
        popularity: track.popularity,
        uri: track.uri,
        sessionCode: this.$route.params.code,
      });
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
    async startSession() {
      let res = await fetch("http://localhost:3000/login");
      let { url } = await res.json();
      console.log(url);
    },
    searchByArtist() {
      this.$store.dispatch("searchByArtist", {
        data: this.search.data,
      });
    },
    searchByAlbum() {
      this.$store.dispatch("searchByAlbum", {
        data: this.search.data,
      });
    },
    searchBySong() {
      this.$store.dispatch("searchBySong", {
        data: this.search.data,
      });
    },
  },
};
</script>
<style>
.font-medieval-wide {
  font-family: "Metamorphous", cursive;
}

body {
  background-color: #fcdb80;
  color: var(--verydarkgrey);
}
</style>
