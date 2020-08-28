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
        dispatch("getActiveSong", payload)
      } catch (error) {
        console.error(error)
      }
    },
    async getQueue({ commit, dispatch }, payload) {
      try {
        let res = await api.get('session/' + payload.sessionCode)
        console.log('got Queue', res.data[0])
        commit('setQueue', res.data[0].queue)
      } catch (error) {
        console.error(error)
      }
    },

    getActiveSong({ commit, dispatch }, song) {
      if (store.state.activeSong == "no active song") {
        commit("setActiveSong", song)
        dispatch("playCurrentSong")
        api.delete("session/" + store.state.activeSession.sessionCode + "/" + song.uri)
        store.state.activeSession.queue.sort((a, b) => b.score - a.score).splice(0, 1)

      }
    },

    changeSong({ commit, dispatch }) {
      store.state.activeSong = "no active song"
      dispatch("getActiveSong", store.state.activeSession.queue.sort((a, b) => b.score - a.score)[0])
    },

    updateSongScore({ commit, dispatch, state }, songRequest) {
      api.put('session/' + songRequest.songData.sessionCode + "/" + songRequest.uri, songRequest.songData)
      if (songRequest.direction == "up") {
        commit("songUpVoted", songRequest.uri)
      } else if (songRequest.direction == "down") {
        commit("songDownVoted", songRequest.uri)
      }
      dispatch("saveToLocal")
    },
  }
}