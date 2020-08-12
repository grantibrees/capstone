import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import { spotifyAuthApi } from "../axiosService"
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

  },
  modules: {
    VisitorModule,
    HostModule
  }
})


