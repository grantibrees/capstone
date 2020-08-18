import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi, spotifySongApi } from "../axiosService"
import store from "."
import router from '../router/index'


Vue.use(Vuex)


export default {
  actions: {
    async playCurrentSong({ commit }, songRequest) {
      console.log("song play")
      try {
        await spotifySongApi.put("play?device_id=" + songRequest.deviceId,
          { "uris": ["spotify:track:4Oun2ylbjFKMPTiaSbbCih"] },
          { headers: { 'Authorization': 'Bearer ' + songRequest.accessToken } })
      } catch (error) {

      }
    }
  }
}