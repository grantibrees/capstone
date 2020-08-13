import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import { spotifyAuthApi } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"
import store from "."


Vue.use(Vuex)

export default {
  actions: {
    async getSpotifyVisitorAuth({ commit, dispatch }) {

      const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: spotifyClientId,
          password: spotifyClientSecret,
        },
      };
      const data = {
        grant_type: 'client_credentials',
      };

      try {
        const res = await spotifyAuthApi.post(
          'token',
          qs.stringify(data),
          headers
        );
        console.log(res.data.access_token, "Bearer Token For Non Owner");
        let spotifyAuthToken = res.data.access_token
        commit('setSpotifyVisitorAuth', spotifyAuthToken)
      } catch (error) {
        console.log(error, "Failed");
      }
    },

    async searchByArtist({ commit, dispatch, state }, query) {
      try {
        const res = await spotifyApi.get('search?q=' + query.data + '&type=artist', { headers: { Authorization: 'Bearer ' + store.state.spotifyAuthToken } })
        console.log(res, 'artist results')
      } catch (error) {
        console.error(error)
      }
    },

    async searchByAlbum({ commit, dispatch, state }, query) {
      try {
        const res = await spotifyApi.get('search?q=' + query.data + '&type=album', { headers: { Authorization: 'Bearer ' + store.state.spotifyAuthToken } })
        console.log(res, 'album results')
      } catch (error) {
        console.error(error)
      }
    },

    async searchBySong({ commit, dispatch, state }, query) {
      try {
        const res = await spotifyApi.get('search?q=' + query.data + '&type=track', { headers: { Authorization: 'Bearer ' + store.state.spotifyAuthToken } })
        console.log(res, 'song results')
        commit("setTrackSearchResults", res.data.tracks.items)

      } catch (error) {
        console.error(error)
      }
    },

  }


}