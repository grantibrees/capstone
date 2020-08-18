<template>
  <div class="SessionUnique">
    <hostComponent></hostComponent>
    <!-- Currently shows search results, need to add this to proper search and change selectSong() to properly add data to state and play song.  -->

    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#songModal"
    >Search</button>

    <div id="songModal" class="modal fade" tabindex="-1" role="dialog">
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
    <!-- QUEUE--------------------------------------------------------------------------------------- -->
    <queue />
  </div>
</template>


<script>
import hostComponent from "../components/HostComponent";
import queue from "../components/Queue";
export default {
  name: "SessionUnique",
  data() {
    return {
      search: {},
    };
  },

  mounted() {
    this.$store.dispatch("joinSession", this.$route.params.code);
    this.$store.dispatch("getSpotifyVisitorAuth");
    this.$store.dispatch('joinRoom', "session")
  },

  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    trackResults() {
      return this.$store.state.trackSearchResults;
    },
  },
  methods: {
    beforeDestory(){
      this.$store.dispatch('leaveRoom', "session")
    },
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
        score: 0,
        sessionCode: this.$route.params.code,
      });
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

  components: {
    hostComponent,
    queue,
  },
};
</script>


<style scoped>
</style>