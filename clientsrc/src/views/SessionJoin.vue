<template>
  <div class="SessionJoin mt-5 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <input v-on:keyup.enter="joinSession" v-model="sessionCode" type="text" class="form-control" />
          <small id="helpId" class="form-text text-muted">enter session code:</small>
          <button class="btn btn-outline-info"  @click="joinSession">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import utils from "../../utils.js";
export default {
  name: "SessionJoin",
  data() {
    return {
      sessionCode: "",
    };
  },
  mounted() {},
  computed: {},
  methods: {
    joinSession() {
      this.$store.dispatch("joinSession", this.sessionCode);
    },
  },
  components: {},
};
</script>


<style scoped>
</style>