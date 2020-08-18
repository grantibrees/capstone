<template>
  <div class="SessionUnique">
    <hostComponent></hostComponent>
    <queue />
  </div>
</template>


<script>
import hostComponent from "../components/HostComponent";
import queue from "../components/Queue";
import { onAuth } from "@bcwdev/auth0-vue";

export default {
  name: "SessionUnique",
  data() {
    return {};
  },

  async mounted() {
    await onAuth();
    await this.callTokens();
    this.joinSession();
  },

  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
  },
  methods: {
    async callTokens() {
      if (this.$store.state.hostTokens.accessToken == false) {
        await this.$store.dispatch("callDownTokens");
      }
    },
    joinSession() {
      if (this.$route.params.code) {
        this.$store.dispatch("joinSession", this.$route.params.code);
      } else {
        console.log("no route params code found");
      }
    },
  },

  components: {
    hostComponent,
    queue,
  },
};
</script>


<style scoped>
</style>