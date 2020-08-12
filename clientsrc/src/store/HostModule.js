import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import { spotifyAuthHost } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "."


Vue.use(Vuex)

export default {
  actions: {
    async getSpotifyHostAuth({ commit, dispatch }) {

      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: spotifyClientId,
          password: spotifyClientSecret
        },
      };
      const data = {
        response_type: 'code',
        redirect_uri: 'http://localhost:8080',
        scope: 'user-read-email user-read-private'
      };
      let clientIdString = headers.auth.username

      try {
        const res = await spotifyAuthHost.get('authorize?client_id=' + clientIdString + '&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:8080&scope=user-read-private%20user-read-email');
        console.log(res.data, "Auth Host test");
        // let spotifyAuthToken = res.data.access_token
        // commit('setSpotifyHostAuth', spotifyAuthToken)
      } catch (error) {
        console.log(error, "Failed");
      }
    },

  }


}