<template>
  <div class="Dashboard container-fluid">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "Dashboard",
  mounted() {
    this.getTokens();
  },
  methods: {
    getTokens() {
      let tokens = {
        accessToken: this.$route.query.accessToken,
        refreshToken: this.$route.query.refreshToken,
        expiresIn: this.$route.query.expiresIn,
      };
      console.log(tokens);
      this.$store.dispatch("setSpotifyHostTokens", tokens);
      this.$router.push({
        name: "SessionCreate",
      });
    },
  },
};
</script>


<style scoped>
</style>