<template>
  <div class="SessionCreate container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <input v-model="newSessionName" type="text" class="form-control" />
          <small id="helpId" class="form-text text-muted">please enter the name of the session</small>
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
        queue: [],
      });
      this.newSessionName = "";
    },
  },
  components: {},
};
</script>


<style scoped>
</style>