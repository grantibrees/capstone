<template>
  <div class="SessionJoin mt-5 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <input
            v-on:keyup.enter="joinSessionVisitor"
            v-model="sessionCode"
            type="text"
            class="form-control"
          />
          <small id="helpId" class="form-text text-muted">Enter Session Code:</small>
          <button class="btn rounded-pill btn-outline-danger" @click="joinSessionVisitor">Join</button>
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
    joinSessionVisitor() {
      this.$store.dispatch("joinSessionVisitor", this.sessionCode);
    },
  },
  components: {},
};
</script>


<style scoped>
</style>