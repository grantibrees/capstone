<template>
  <div class="Queue container-fluid">
    <div class="row chocolate">
      <!-- SECTION If there IS a queue or track length -->
      <div
        v-if="(this.activeSession.queue && this.activeSession.queue.length > 0) || this.activeSong.trackLength"
      >
        <div class="row"></div>
        <div class="col-3">
          <img class="rounded my-auto img-thumbnail img-fluid" :src="activeSong.albumCover.url" alt />
        </div>
        <div class="col-9">
          <h3>Playing</h3>
          Title: {{activeSong.songTitle}}
          Album: {{activeSong.album}}
          Track Length: {{activeSong.trackLength}}
        </div>
        <div class="col-12">
          <button class="btn btn-outline-secondary">Play/Pause</button>
          <button class="btn btn-outline-secondary">Skip</button>
        </div>
      </div>
      <!-- SECTION If there is NO queue or NO track length -->
      <div v-else>
        <div class="text-white bg-primary rounded container">
          <div class="row justify-content-center align-items-center">
            <div class="col-8">
              <h3>Playing</h3>Title:
              Album:
              Track Length:
            </div>
            <!-- Is this going to be handled by the SKD player? -->
          </div>
          <div class="row justify-content-center">
            <div class="col-10">
              <button>Play/Pause</button>
              <button>Skip</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <div class="row vanilla overflowy">
      <songs v-for="singleSong in songsQueue" :songData="singleSong" :key="singleSong._id" />
    </div>
  </div>
</template> 


<script>
import songs from "../components/Songs";
export default {
  name: "Queue",
  data() {
    return {
      queueExist: false,
    };
  },
  mounted() {
    // this.startSong();
  },
  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    songsQueue() {
      if (this.$store.state.activeSession.queue.length >= 1) {
        this.queueExist = true;
        let sorted = this.$store.state.activeSession.queue.sort(
          (a, b) => b.score - a.score
        );
        return sorted;
      }
      return [];
    },
    activeSong() {
      return this.$store.state.activeSong;
    },
  },
  methods: {
    startSong() {
      if (this.songsQueue.length > 0) {
        this.$store.dispatch("getActiveSong", this.songsQueue[0]);
      }
    },
    // songsQueued(){
    //   if(this.$store.state.activeSession.queue.length >= 0){
    //     this.queue = true
    //   } else {
    //     this.queue = false
    //   }
    // }
  },
  components: {
    songs,
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
.player-height {
  min-height: 20%;
  max-height: 20%;
}
.queue-height {
  min-height: 80%;
  max-height: 80%;
}
.overflowy {
  overflow-y: auto;
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