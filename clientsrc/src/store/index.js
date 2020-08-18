import Vue from 'vue'
import Vuex from 'vuex'
import { api, hostTokensApi, loginApi, spotifySongApi, spotifyAuthApi, spotifyApi } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "../store"
import VisitorModule from "./VisitorModule"
import SessionModule from "./SessionModule"
import SongModule from "./SongModule"



Vue.use(Vuex)

import { onAuth } from "@bcwdev/auth0-vue";

export default new Vuex.Store({
  state: {
    spotifyAuthToken: "",
    trackSearchResults: [],
    user: {},
    hostTokens: {
      accessToken: '',
      refreshToken: '',
      expiresIn: ''
    },
    activeSession: {
    },
    activeSong: {},
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
    setNextSong(state, nextSong) {
      state.nextSong = nextSong
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
      hostTokensApi.defaults.headers.authorization = bearer;
      console.log("Set Bearer tokens")
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
      hostTokensApi.defaults.headers.authorization = "";
    },

    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
        console.log("profile data", res.data);
      } catch (err) {
        console.error(err)
      }
    },
    setSpotifyHostTokens({ commit, dispatch, state }, tokenData) {

      commit("setHostTokens", tokenData)
      console.log(" host tokens set to store: ", tokenData);
    },

    async saveSpotifyHostTokens({ commit, dispatch }, tokenData) {
      try {
        let payload = {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresIn: tokenData.expiresIn,
        }
        console.log(payload);
        let res = await hostTokensApi.post('tokensave', payload)
        console.log("host tokens posted to server", res);
      } catch (error) {
        console.error(error)
      }
    },

    async callDownTokens({ commit, dispatch, state }) {
      try {
        let res = await hostTokensApi.get('tokenget')
        console.log(res);
      } catch (error) { console.log(error); }
    }


  },
  modules: {
    SessionModule,
    VisitorModule,
    SongModule
  }
})


