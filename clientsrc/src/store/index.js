import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import { spotifyAuthApi } from "../axiosService"
import { api, loginApi } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "../store"
import VisitorModule from "../store/VisitorModule"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyAuthToken: "",
    trackSearchResults: []
  },
  mutations: {
    setSpotifyVisitorAuth(state, spotifyAuthToken) {
      state.spotifyAuthToken = spotifyAuthToken
    },
    setTrackSearchResults(state, searchResults) {
      state.trackSearchResults = searchResults
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
    async getHostLogin({ commit, dispatch }) {
      try {
        let res = await loginApi.get("")
        console.log(res.data)

      } catch (error) {

      }
    },
    // FIXME Add back get profile functionality, currently api does not support this action.
    async getProfile({ commit }) {
      try {
        console.log("get profile rand")
        // let res = await api.get("/profile")
        // commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion

  },
  modules: {
    VisitorModule,
  }
})


