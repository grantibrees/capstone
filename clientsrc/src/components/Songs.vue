<template>
  <div class="songs border border-rounded bg-secondary text-white row">
    <div class="col-2">
      <button @click.prevent="vote('up')" class="btn btn-success btn-outline">Upvote</button>
    </div>
    <div class="col-8"> 
    {{songData.title}}
    {{songData.album}}
    {{songData.score}}
    <img class="rounded my-auto" src="{{songData.albumCover}}" alt="">
    </div>
    <div class="col-2">
      <button @click.prevent="vote('down')" class="btn btn-danger btn-outline">Downvote</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'songs',
  prop:[
    songData
  ],
  data(){
    return {
      upVoteToggle=true,
      downVoteToggle=true
    }
  },
  computed:{},
  methods:{
    vote(direction){
      // If your clicking down and already had voted up this prob will just double vote up without additional measures
      if(direction == 'up' && this.upVoteToggle == true){
        songData.score++
        this.upVoteToggle = false
      } else if (direction == 'up' && this.upVoteToggle == false){
        songData.score--
        this.upVoteToggle = true
      }  else if (direction == 'down' && this.downVoteToggle == true){
        songData.score--
        this.donwVoteToggle = false
      } else {
        songData.score++
        this.downVoteToggle = true
      }
    }
  },
  components:{}
}
</script>


<style scoped>

</style>