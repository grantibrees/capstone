<template>
  <div class="Queue">
    <div class="text-white bg-primary rounded container">
      <div class="row justify-content-center align-items-center p-2">
        <div class="col-2">
          <img class="rounded my-auto img-thumbnail img-fluid" :src="activeSong.albumCover.url" alt />
        </div>
        <div class="col-8">
          <h3>Playing</h3>
          Title: {{activeSong.songTitle}}
          Album: {{activeSong.album}}
          Track Length: {{activeSong.trackLength}}
        </div>
        <!-- Is this going to be handled by the SKD player? -->
      </div>
      <div class="row justify-content-center p-2">
        <div class="col-10">
          <button>Play/Pause</button>
          <button>Skip</button>
        </div>
      </div>
    </div>
    <div>
      <h5>Queue</h5>
      <songs v-for="singleSong in songsQueue" :songData="singleSong" :key="singleSong._id" />
    </div>
  </div>
</template>


<script>
import songs from "../components/Songs";
export default {
  name: "Queue",
  data() {
    return {};
  },
  mounted() {
    // this.startSong();
  },
  computed: {
    songsQueue() {
      let sorted = this.$store.state.activeSession.queue.sort(
        (a, b) => b.score - a.score
      );
      return sorted;
    },
    activeSong() {
      return this.$store.state.activeSong;
    },
  },
  methods: {
    startSong() {
      if (this.songsQueue.length > 0) {
        this.$store.dispatch("getActiveSong", songsQueue[0]);
      }
    },
  },
  components: {
    songs,
  },
};
</script>


<style scoped>
</style>