<template>
  <div class="SessionUnique">
    <hostComponent></hostComponent>
    <queue />
  </div>
</template>


<script>
import hostComponent from "../components/HostComponent";
import queue from "../components/Queue";
export default {
  name: "SessionUnique",
  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch("joinSession", this.$route.params.code);
  },

  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
  },
  methods: {},

  components: {
    hostComponent,
    queue,
  },
};
</script>


<style scoped>
</style>