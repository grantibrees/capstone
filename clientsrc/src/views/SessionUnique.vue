<template>
  <div class="SessionUnique">


  </div>
</template>


<script>
export default {
  name: 'SessionUnique',
  data(){
    return {}
  },

  mounted() {
this.$store.dispatch("joinSession", this.$route.params.code)
  },

  computed:{
    activeSession() {
      return this.$store.state.activeSession
    }
  },
  methods:{},

  components:{}
}
</script>


<style scoped>

</style>