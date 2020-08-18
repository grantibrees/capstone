<template>
  <div class="Queue">
    <div class="text-white bg-primary rounded container">
      <div class="row justify-content-center p-2">
        <div class="col-2">Cover Art: {{activeSong.albumCover}}</div>
        <div class="col-8">
          <h3>Playing</h3>
          Title: {{activeSong.title}}
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
    this.changeSong();
  },
  computed: {
    songsQueue() {
      return this.$store.state.activeSession.queue;
    },
    activeSong() {
      return this.$store.state.activeSong;
    },
  },
  methods: {
    changeSong() {
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