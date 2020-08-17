<template>
  <div class="Queue">
    <div class="bg-secondary text-white border border-rounded">
      <div class="row">
        <h3>Playing</h3>
        <!-- {{activeSong.title}}
        {{activeSong.album}}
        {{activeSong.trackLength}}
        {{activeSong.albumCover}}-->
      </div>
      <!-- Is this going to be handled by the SKD player? -->
      <!-- <div class="row">
        <button>Play/Pause</button>
        <button>Skip</button>
      </div>-->
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
  mounted() {},
  computed: {
    songsQueue() {
      return this.$store.state.activeSession.queue;
    },
    activeSong() {
      return this.$store.state.activeSong;
    },
  },
  methods: {},
  components: {
    songs,
  },
};
</script>


<style scoped>
</style>