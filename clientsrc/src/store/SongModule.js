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
    // async createSession({ commit }, sessionData) {
    //   try {
    //     console.log(sessionData)
    //   await api.post("session", sessionData)
    //   commit("setActiveSession", sessionData)
    //   router.push( {name: 'SessionUnique', params: {code: sessionData.sessionCode} })
    //   } catch (error) {
    //     console.error(error)
    //   }

    // },

    // async joinSession( {commit}, sessionCode ) {
    //   try {
    //     let res = await api.get("session/" + sessionCode)
    //     commit("setActiveSession", res.data)
    //     router.push( {name: 'SessionUnique', params: {code: sessionCode} })
    //   } catch (error) {
    //     console.error(error)

    //   }
    // }
  }
}