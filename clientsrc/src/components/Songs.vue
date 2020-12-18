<template>
  <div class="songs bg-primary row my-1">
    <div class="col-2 p-0">
      <button v-if="this.$store.state.settings.novoting == false"
        @click.prevent="vote('up')"
        class="btn p-3 h-100 w-100 b-0"
        :class="upVoteToggle ? 'btn-outline-info' : 'btn-info'"
      >
        <i class="fa fa-arrow-up"></i>
      </button>
    </div>
    <div class="col-2 p-0">
      <img
        class="rounded my-auto img-thumbnail img-fluid"
        :src="songData.albumCover.url"
        alt
      />
    </div>

    <div class="col">
      <div class="row align-items-center">
        <small class="col justify-content-center">
          {{ nameTrunc(songData.songTitle + "-" + songData.artist) }}
        </small>
        <div class="col-3 justify-content-center">
          <i class="fa fa-th-list"></i>
          {{ songData.score }}
        </div>
      </div>
    </div>

    <div class="col-1">
      <i
        v-if="this.$store.state.user.email"
        class="far fa-trash-alt"
        @click="deleteFromQueue(songData)"
      ></i>
    </div>

    <div class="col-2 p-0">
      <button v-if="this.$store.state.settings.novoting == false"
        @click.prevent="vote('down')"
        class="btn p-3 h-100 w-100 b-0"
        :class="downVoteToggle ? 'btn-outline-warning' : 'btn-warning'"
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
    deleteFromQueue(songData) {
      this.$store.dispatch("deleteFromQueue", songData);
    },
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
    nameTrunc(name) {
      if (name.length > 30) {
        return name.slice(0, 28) + "...";
      }
      return name;
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