<template>
  <div class="songs bg-primary row my-1">
    <div class="col-2 p-0">
      <button
        @click.prevent="vote('up')"
        class="btn p-3"
        :class="upVoteToggle ? 'btn-outline-info':'btn-info'"
      >
        <i class="fa fa-arrow-up"></i>
      </button>
    </div>
    <div class="col">
      <div class="row">
        <small class="col-8 justify-content-center">
          {{songData.songTitle}} -
          {{songData.artist}}
        </small>
        <div class="col-4 justify-content-center">
          <div class="row">
            <i class="fa fa-th-list"></i>
            {{songData.score}}
          </div>
          <div class="row">
            <div v-if="(deleteButton)">
              <button @click="deleteSong" class="btn btn-outline-danger p-3">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <img

        class="rounded my-auto img-thumbnail img-fluid"
        :src="songData.albumCover.url"
        alt
      />-->
    </div>
    <div class="col-2 p-0">
      <button
        @click.prevent="vote('down')"
        class="btn p-3"
        :class="downVoteToggle ? 'btn-outline-warning':'btn-warning'"
      >
        <i class="fa fa-arrow-down"></i>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "songs",
  mounted() {
    this.hostCheck();
  },
  data() {
    return {
      upVoteToggle: true,
      downVoteToggle: true,
      voteDisabled: false,
      deleteButton: false,
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
    async hostCheck() {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile", this.$auth.user);
      let email = await this.$store.dispatch(
        "getSessionEmail",
        this.$route.params.code
      );
      if (email == this.$auth.user.email) {
        this.deleteButton = true;
      }
    },
    deleteSong() {},
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