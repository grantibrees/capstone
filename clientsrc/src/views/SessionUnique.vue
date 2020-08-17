<template>
  <div class="SessionUnique">
    <hostComponent></hostComponent>
  </div>
</template>


<script>
import hostComponent from "../components/HostComponent";
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
  },
};
</script>


<style scoped>
</style>