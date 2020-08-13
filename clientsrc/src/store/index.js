import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import { spotifyAuthApi } from "../axiosService"
import { api } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "../store"
import VisitorModule from "../store/VisitorModule"
import HostModule from "../store/HostModule"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyAuthToken: ""
  },
  mutations: {
    setSpotifyVisitorAuth(state, spotifyAuthToken) {
      state.spotifyAuthToken = spotifyAuthToken
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion

  },
  modules: {
    VisitorModule,
    HostModule
  }
})


