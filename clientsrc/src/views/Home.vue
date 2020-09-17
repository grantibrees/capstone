<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row chocolate min-height2 align-items-center justify-content-center">
        <div class>
          <div class="justify-content-center mt-2">
            <h1 class="font-fancy">Song Sundae</h1>
          </div>
          <div class="justify-content-center mt-4 mx-5">
            <p>You don't need to steal your friend's phone to put on decent music.</p>
          </div>
        </div>
      </div>
      <div class="row vanilla min-height align-items-center">
        <div class="col-12">
          <div class="row px-5 py-3">
            <button
              class="btn btn-block btn-outline-danger p-3 rounded-pill"
              @click="hostTrigger()"
            >
              <h2>Host a Session</h2>
            </button>
          </div>
          <div class="row px-5 py-3">
            <button
              @click="movePage('SessionJoin')"
              class="btn btn-block btn-outline-danger p-3 rounded-pill"
            >
              <h2>Join a Session</h2>
            </button>
          </div>
        </div>
      </div>

      <div class="row strawberry min-height2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onAuth } from "@bcwdev/auth0-vue";
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
    async hostTrigger() {
      location.replace(this.url);
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
        sessionCode: this.$route.params.code,
      });
    },
    movePage(page) {
      this.$router.push({ name: page });
    },
    async startSession() {
      let res = await fetch("http://localhost:3000/login");
      let { url } = await res.json();
      // console.log(url);
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
body {
  background-color: #fff8ed;
  color: var(--black);
}
.font-fancy {
  font-family: "Norican", cursive;
}

.min-height {
  min-height: 36vh;
}
.min-height2 {
  min-height: 32vh;
}

.strawberry {
  background-color: #ffd9d1;
}
.chocolate {
  background-color: #613921;
}
.vanilla {
  background-color: #fff8ed;
}
.strawberry-accent {
  color: white;
  background-color: #e64772;
}
.bright-accent {
  color: white;
  background-color: #0fb2b5;
}
</style>
