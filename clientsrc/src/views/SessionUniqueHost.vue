<template>
  <div class="SessionUnique container-fluid full-height">
    <div class="row chocolate top-height">
      <hostComponent></hostComponent>
    </div>

    <div class="row mid-height">
      <queue />
    </div>

    <div class="row bot-height strawberry align-items-center">
      <div class="col-12">
        <div class="row px-5 py-3">
          <div id="songModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-scrollable h-75" role="document">
              <div class="modal-content bg-success">
                <div class="modal-header">
                  <h5 class="modal-title mr-5">Search</h5>

                  <form class="form-inline mr-5" @submit.prevent="searchBySong()">
                    <input
                      v-model="search.data"
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      class="btn btn-outline-danger rounded-pill my-2 my-sm-0"
                      type="submit"
                    >Search</button>
                  </form>

                  <button
                    type="button"
                    @click="clearTrackResults"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div
                    class="bg-primary m-2 p-2 row justify-content-between rounded-pill"
                    v-for="result in trackResults"
                    :key="result.id"
                  >
                    <div class="col-2">
                      <img class="ml-5 rounded img-fluid" :src="result.album.images[0].url" alt />
                    </div>
                    {{result.artists[0].name}}- {{result.name}}
                    <button
                      class="btn btn-outline-secondary mr-5 rounded-pill col-2"
                      @click.prevent="selectSong(result)"
                    >+</button>
                  </div>
                  <infinite-loading
                    v-if="!noLoadForYou"
                    spinner="waveDots"
                    @infinite="infiniteHandler"
                  ></infinite-loading>
                  <div v-if="noLoadForYou">
                    <div class="row bg-primary justify-content-center">End of results!</div>
                  </div>
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn btn-block btn-outline-danger p-3 rounded-pill"
            data-toggle="modal"
            data-target="#songModal"
            @click="yesLoadForYou"
          >Add a Song</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import hostComponent from "../components/HostComponent";
import { onAuth } from "@bcwdev/auth0-vue";
import queue from "../components/Queue";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "SessionUnique",
  data() {
    return {
      search: {},
      oldSearchLength: 0,
      isSearching: false,
      noLoadForYou: false,
    };
  },

  async beforeMount() {
    await this.hostCheck();
  },

  mounted() {
    this.joinSession();
    this.$store.dispatch("getSpotifyVisitorAuth");
    this.$store.dispatch("joinRoom", "session-" + this.$route.params.code);

    // this.$store.dispatch("getQueue", {
    //   sessionCode: this.$route.params.code
    // })
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
    yesLoadForYou() {
      this.noLoadForYou = false;
    },
    async infiniteHandler($state) {
      // debugger;
      console.log(
        "search Results",
        this.oldSearchLength,
        this.trackResults.length
      );
      if (
        !this.isSearching &&
        this.oldSearchLength != this.trackResults.length &&
        this.trackResults.length <= 50
      ) {
        this.isSearching = true;
        await this.searchBySong();
        $state.loaded();
        setTimeout((this.isSearching = false), 2000);
      } else {
        console.log("no load");
        this.noLoadForYou = true;
      }

      // $state.loaded()
    },
    clearTrackResults() {
      this.$store.commit("clearTrackSearchResults");
      this.oldSearchLength = 0;
      this.noLoadForYou = false;
      this.search = "";
      console.log(this.infiniteHandler);
      this.infiniteHandler.reset();
    },
    stateLoaded($state) {
      $state.loaded();
      console.log("loaded");
    },

    async hostCheck() {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile", this.$auth.user);
      let email = await this.$store.dispatch(
        "getSessionEmail",
        this.$route.params.code
      );
      if (email == this.$auth.user.email) {
        await this.callTokens();
      }
    },

    beforeDestory() {
      this.$store.dispatch("leaveRoom", "session");
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
    async searchBySong() {
      this.oldSearchLength = this.trackResults.length;
      await this.$store.dispatch("searchBySong", {
        data: this.search.data,
        page: this.trackResults.length,
      });
    },

    async callTokens() {
      if (this.$store.state.hostTokens.accessToken == false) {
        if (this.activeSession.creatorEmail == this.$auth.user.email) {
          await this.$store.dispatch("callDownTokens");
        } else {
          console.log("Not the host, no tokens for you");
        }
      }
    },
    async joinSession() {
      if (this.$route.params.code) {
        await this.$store.dispatch("joinSession", this.$route.params.code);
      } else {
        console.log("no route params code found");
      }
    },
  },

  components: {
    hostComponent,
    queue,
    InfiniteLoading,
  },
};
</script>


<style scoped>
body {
  background-color: #fff8ed;
  color: var(--black);
}
.font-fancy {
  font-family: "Norican", cursive;
}
.full-height {
  min-height: 100%;
  max-height: 100%;
}
.top-height {
  min-height: 8vh;
  max-height: 8vh;
}
.mid-height {
  min-height: 72vh;
  max-height: 72vh;
}
.bot-height {
  min-height: 20vh;
  max-height: 20vh;
}

.strawberry {
  background-color: #ffd9d1;
}
.chocolate {
  background-color: #74462c;
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
.rm-my {
  margin-top: 0em !important;
  margin-bottom: 0em !important;
}
</style>