import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi } from "../axiosService"
import store from "."
import router from '../router/index'

Vue.use(Vuex)


export default {
  actions: {
    async createSession({ commit }, sessionData) {
      try {
        console.log(sessionData)
        await api.post("session/post", sessionData)
        commit("setActiveSession", sessionData)
        router.push({ name: 'SessionUnique', params: { code: sessionData.sessionCode } })
      } catch (error) {
        console.error(error)
      }

    },

    async joinSession({ commit, dispatch }, sessionCode) {
      try {
        let res = await api.get("session/" + sessionCode)
        commit("setActiveSession", res.data[0])
        if(res.data[0].queue[0]){
        commit("setActiveSong", res.data[0].queue[0])}
        router.push({ name: 'SessionUnique', params: { code: sessionCode } })
      } catch (error) {
        console.error(error)

      }
    }
  }
}