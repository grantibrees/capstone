<template>
  <div class="SessionCreate">session create page</div>
</template>


<script>
export default {
  name: "SessionCreate",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getHostLogin");
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>