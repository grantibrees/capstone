<template>
  <div class="songs border border-rounded bg-secondary text-white row font-medieval-wide h-25">
    <div class="col-2">
      <button v-if="upVoteToggle == true" @click.prevent="vote('up')" class="btn btn-success btn-outline">Upvote</button>
       <button v-if="upVoteToggle == false" @click.prevent="vote('up')" class="btn btn-outline-success btn-outline">Upvote</button>
    </div>
    <div class="col-8 ">
      {{songData.songTitle}}-
      {{songData.artist}}

      {{songData.score}}
      <!-- <img

        class="rounded my-auto img-thumbnail img-fluid"
        :src="songData.albumCover.url"
        alt
      /> -->
    </div>
    <div class="col-2">
      <button v-if="downVoteToggle == true" @click.prevent="vote('down')" class="btn btn-danger btn-outline">Downvote</button>
      <button v-if="downVoteToggle == false" @click.prevent="vote('down')" class="btn btn-outline-danger btn-outline">Downvote</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "songs",
  data() {
    return {
      upVoteToggle: true,
      downVoteToggle: true,
      voteDisabled: false,
    };
  },
  computed: {},
  methods: {
    delay(){
      this.timeout = setTimeout(() => {
          this.voteDisabled = false
        }, 2000)
    },
    vote(direction) {
      if(this.voteDisabled == false){
        this.voteDisabled = true
      if (direction == "up" && this.upVoteToggle == true) {
        this.songData.score++;
        this.upVoteToggle = false;
      } else if (direction == "up" && this.upVoteToggle == false) {
        this.songData.score--;
        this.upVoteToggle = true;
      } else if (direction == "down" && this.downVoteToggle == true) {
        this.songData.score--;
        this.downVoteToggle = false;
      } else if (direction == "down" && this.downVoteToggle == false) {
        this.songData.score++;
        this.downVoteToggle = true;
      }
      this.$store.dispatch('updateSongScore', {
        songData: this.songData,
        uri: this.songData.uri.split(":")[2]
      })
      this.delay()
      }
    },
  },
  props: ["songData"],
  components: {},
};
</script>



<style scoped>
.font-medieval-wide{
    font-family: 'Metamorphous', cursive;
    }
</style>