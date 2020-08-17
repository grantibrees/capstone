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
import VisitorModule from "./VisitorModule"
import SessionModule from "./SessionModule"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyAuthToken: "",
    trackSearchResults: [],
    user: {},
    hostTokens: {
      accessToken: '',
      refreshToken: '',
      expiresIn: ''
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSpotifyVisitorAuth(state, spotifyAuthToken) {
      state.spotifyAuthToken = spotifyAuthToken
    },
    setTrackSearchResults(state, searchResults) {
      state.trackSearchResults = searchResults
    },
    setHostTokens(state, tokens) {
      state.hostTokens.accessToken = tokens.accessToken
      state.hostTokens.refreshToken = tokens.refreshToken
      state.hostTokens.expiresIn = tokens.expiresIn
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
    setSpotifyHostTokens({ commit }, tokenData) {
      commit("setHostTokens", tokenData)
    },
    // FIXME Add back get profile functionality, currently api does not support this action.
    //#endregion

  },
  modules: {
    SessionModule,
    VisitorModule,
  }
})


