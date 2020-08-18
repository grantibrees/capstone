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
        api.delete("session/" + store.state.activeSession.sessionCode, store.state.activeSong)
        store.state.activeSession.queue.splice(0, 1)

      }
    },

    changeSong({ commit, dispatch }) {
      store.state.activeSong = "no active song"
      dispatch("getActiveSong", store.state.activeSession.queue[0])
    }
  }
}