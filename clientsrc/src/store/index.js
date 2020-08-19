import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi, spotifySongApi, spotifyAuthApi, spotifyApi } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "../store"
import VisitorModule from "./VisitorModule"
import SessionModule from "./SessionModule"
import SongModule from "./SongModule"
import { socketStore } from "./SocketStore"



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyAuthToken: "",
    trackSearchResults: [],
    user: {},
    hostDeviceId: '',
    hostTokens: {
      accessToken: '',
      refreshToken: '',
      expiresIn: ''

    },
    activeSession: {
      queue: []
    },
    activeSong: "no active song",
    nextSong: {},

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
    },

    setActiveSession(state, sessionData) {
      state.activeSession = sessionData
    },
    setActiveSong(state, activeSong) {
      state.activeSong = activeSong
    },
    setQueue(state, queue){
      state.activeSession.queue = queue
    },
    setNextSong(state, nextSong) {
      state.nextSong = nextSong
    },
    setDeviceId(state, deviceId) {
      state.hostDeviceId = deviceId
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

    getDeviceId({ commit }, deviceId) {
      commit("setDeviceId", deviceId)
    }
    // FIXME Add back get profile functionality, currently api does not support this action.
    //#endregion

  },
  modules: {
    SessionModule,
    VisitorModule,
    SongModule,
    socketStore
  }
})


