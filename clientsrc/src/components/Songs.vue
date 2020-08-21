<template>
  <div class="songs border border-rounded bg-secondary text-white row font-medieval-wide h-25">
    <div class="col-2">
      <button
        v-if="this.upVoteToggle == true"
        @click.prevent="vote('up')"
        class="btn btn-success btn-outline"
      >Upvote</button>
      <button
        v-if="this.upVoteToggle == false"
        @click.prevent="vote('up')"
        class="btn btn-outline-success btn-outline"
      >Upvote</button>
    </div>
    <div class="col-8">
      {{songData.songTitle}}-
      {{songData.artist}}
      {{songData.score}}
      <!-- <img

        class="rounded my-auto img-thumbnail img-fluid"
        :src="songData.albumCover.url"
        alt
      />-->
    </div>
    <div class="col-2">
      <button
        v-if="this.downVoteToggle == true"
        @click.prevent="vote('down')"
        class="btn btn-danger btn-outline"
      >Downvote</button>
      <button
        v-if="this.downVoteToggle == false"
        @click.prevent="vote('down')"
        class="btn btn-outline-danger btn-outline"
      >Downvote</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "songs",
  data() {
    return {
      voteDisabled: false,
    };
  },
  computed: {
    upVoteToggle() {
      let songCheck = this.$store.state.songsUpVoted.filter(
        (song) => song == this.songData.uri.split(":")[2]
      );
      return songCheck == this.songData.uri.split(":")[2] ? true : false;
    },
    downVoteToggle() {
      let songCheck = this.$store.state.songsDownVoted.filter(
        (song) => song == this.songData.uri.split(":")[2]
      );
      return songCheck == this.songData.uri.split(":")[2];
    },
  },
  methods: {
    delay() {
      this.timeout = setTimeout(() => {
        this.voteDisabled = false;
      }, 2000);
    },
    vote(direction) {
      if (this.voteDisabled == false) {
        this.voteDisabled = true;
        if (direction == "up" && this.upVoteToggle == false) {
          this.songData.score++;
        } else if (direction == "down" && this.downVoteToggle == false) {
          this.songData.score--;
        }
        this.$store.dispatch("updateSongScore", {
          songData: this.songData,
          uri: this.songData.uri.split(":")[2],
          direction: direction,
        });
        this.delay();
      }
    },
  },
  props: ["songData"],
  components: {},
};
</script>



<style scoped>
.font-medieval-wide {
  font-family: "Metamorphous", cursive;
}
</style>