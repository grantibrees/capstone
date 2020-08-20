<template>
  <div class="Queue">
    <div v-if="(this.activeSession.queue && this.activeSession.queue.length > 0) || this.activeSong.trackLength">
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
   <div v-else>
          <div class="text-white bg-primary rounded container">
      <div class="row justify-content-center align-items-center p-2">

       
        <div class="col-8">
          <h3>Playing</h3>
          Title: 
          Album: 
          Track Length: 
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
      <h4>Queue</h4>
      </div>
    </div>

  </div>
</template> 


<script>
import songs from "../components/Songs";
export default {
  name: "Queue",
  data() {
    return {
      queueExist: false
     };
  },
  mounted() {
    // this.startSong();
  },
  computed: {
    activeSession(){
      return this.$store.state.activeSession
    },
    songsQueue() {
      if(this.$store.state.activeSession.queue.length >= 1){
      this.queueExist = true; 
      let sorted =  this.$store.state.activeSession.queue.sort((a, b) =>  b.score - a.score );
      return sorted
      } 
      return []
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
</style>