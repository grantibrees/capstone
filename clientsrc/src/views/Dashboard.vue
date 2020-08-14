<template>
  <div class="Dashboard container-fluid">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "Dashboard",
  mounted() {
    this.$store.dispatch("setSpotifyCreds", this.$route.query);
  },
};
</script>


<style scoped>
</style>