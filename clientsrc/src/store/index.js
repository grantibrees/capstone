import Vue from 'vue'
import Vuex from 'vuex'
import { spotifyApi } from "../axiosService"
import router from '../router/index'
import Axios from "axios"
import qs from 'qs'
import { spotifyClientId, spotifyClientSecret } from "../authConfig"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getSpotifyAuth({commit, dispatch}){
     

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
      
      try{
        const res = await spotifyApi.post(
          'token',
      qs.stringify(data),
      headers
        );
        console.log(res.data.access_token, "Did this work?");

      } catch (error){
        console.log(error, "Failed");
      }
    }
      
    

  },
  modules: {
  }
})
