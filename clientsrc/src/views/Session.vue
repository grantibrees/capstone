<template>
  <div class="Session container-fluid">
    <div class="row">
      <div class="col-12 text-dark">
        <button class="btn btn-info" @click="play(deviceId)"></button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Session",
  data() {
    return {
      deviceId: "",
    };
  },
  mounted() {
    console.log("mounted session page");
  },

  methods: {},
  components: {},
};
</script>


<style scoped>
</style>