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
        await spotifySongApi.put("play?device_id=" + store.state.hostDeviceId,
          { "uris": [store.state.activeSong.uri] },
          { headers: { 'Authorization': 'Bearer ' + store.state.hostTokens.accessToken } })
      } catch (error) {
        console.error(error)
      }
    },

    async addToQueue({ commit, dispatch }, payload) {
      try {
        let res = await api.put('session/' + payload.sessionCode, payload)
        console.log(res)
        dispatch("joinSession", payload.sessionCode)
        dispatch("getActiveSong", payload)
      } catch (error) {
        console.error(error)
      }
    },

    getActiveSong({ commit, dispatch }, song) {
      if (store.state.activeSong == "no active song") {
        commit("setActiveSong", song)
        dispatch("playCurrentSong")
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