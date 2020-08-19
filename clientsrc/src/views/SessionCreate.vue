<template>
  <div class="SessionCreate container-fluid mt-5 font-medieval-wide">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="form-group">
          <h5>Warning: You'll need Spotify Premium to Host a Session </h5>
          <input v-model="newSessionName" type="text" placeholder="Choose A Name For Your Session" class="form-control" />
          <h5 id="helpId" class="form-text text-muted">please enter the name of the session</h5>
          <button class="btn btn-outline-info" @click="createSession">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import utils from "../../utils.js";
export default {
  name: "SessionCreate",
  data() {
    return {
      newSessionName: "",
    };
  },
  mounted() {},
  computed: {},
  methods: {
    createSession() {
      this.$store.dispatch("createSession", {
        sessionName: this.newSessionName,
        sessionCode: utils.randomCode(),
        userEmail: this.$store.state.user.email,
      });
      this.newSessionName = "";
    },
  },
  components: {},
};
</script>


<style scoped>
  .font-medieval-wide{
    font-family: 'Metamorphous', cursive;
    }

</style>