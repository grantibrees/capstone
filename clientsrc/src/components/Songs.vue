<template>
  <div class="songs bg-primary row my-1">
    <div class="col-2 py-2">
      <button
        @click.prevent="vote('up')"
        class="btn"
        :class="upVoteToggle ? 'btn-info':'btn-outline-info'"
      >
        <i class="fa fa-arrow-up"></i>
      </button>
    </div>
    <div class="col">
      <div class="row">
        <div class="col-8 justify-content-center">
          {{songData.songTitle}} -
          {{songData.artist}}
        </div>
        <div class="col-4 justify-content-center">Vote Count: {{songData.score}}</div>
      </div>

      <!-- <img

        class="rounded my-auto img-thumbnail img-fluid"
        :src="songData.albumCover.url"
        alt
      />-->
    </div>
    <div class="col-2 py-2">
      <button
        @click.prevent="vote('down')"
        class="btn btn-sm"
        :class="downVoteToggle ? 'btn-danger':'btn-outline-danger'"
      >
        <i class="fa fa-arrow-down"></i>
      </button>
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
    delay() {
      this.timeout = setTimeout(() => {
        this.voteDisabled = false;
      }, 2000);
    },
    vote(direction) {
      if (!this.voteDisabled) {
        this.voteDisabled = true;
        if (direction == "up") {
          this.upVoteToggle = !this.upVoteToggle;
        } else if (direction == "down") {
          this.downVoteToggle = !this.downVoteToggle;
        }

        if (direction == "up") {
          if (this.upVoteToggle) {
            this.songData.score--;
          } else {
            this.songData.score++;
          }
        } else if (direction == "down") {
          if (this.downVoteToggle) {
            this.songData.score++;
          } else {
            this.songData.score--;
          }
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