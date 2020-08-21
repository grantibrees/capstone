<template>
  <div class="Queue col">
    <div class="row chocolate">
      <!-- SECTION If there IS a queue or track length -->
      <div
        class="col-12"
        v-if="(this.activeSession.queue && this.activeSession.queue.length > 0) || this.activeSong.trackLength"
      >
        <div class="row">
          <div class="col-3">
            <img
              class="rounded my-auto img-thumbnail img-fluid"
              :src="activeSong.albumCover.url"
              alt
            />
          </div>

          <div class="col-9">
            <div class="row justify-content-center">
              <h3>Playing</h3>
            </div>
            <div class="row justify-content-center">Title: {{activeSong.songTitle}}</div>
            <div class="row justify-content-center">Album: {{activeSong.album}}</div>
            <div class="row justify-content-center">Track Length: {{activeSong.trackLength}}</div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-1"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary">Play/Pause</button>
          </div>
          <div class="col-2"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary">Skip</button>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <!-- SECTION If there is NO queue or NO track length -->
      <div v-else>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3 align-self-center">
            <img
              class="rounded img-thumbnail img-fluid"
              src="https://images.squarespace-cdn.com/content/5d2e2c5ef24531000113c2a4/1564770252898-1KLCZDE9BJRSWDSMIM7L/image-asset.png"
              alt
            />
          </div>
          <div class="col-7">
            <div class="row justify-content-center">
              <h3>Playing</h3>
            </div>
            <div class="row justify-content-center">Title:</div>
            <div class="row justify-content-center">Album:</div>
            <div class="row justify-content-center">Track Length:</div>
          </div>
          <div class="col-1"></div>
        </div>
        <div class="row justify-content-center">
          <div class="col-1"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary">Play/Pause</button>
          </div>
          <div class="col-2"></div>

          <div class="col-4">
            <button class="btn btn-outline-secondary">Skip</button>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
    <div class="row vanilla"></div>
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