import Vue from "vue";
import Vuex from "vuex";
import { spotifyApi } from "../axiosService";
import { spotifyAuthApi } from "../axiosService";
import router from "../router/index";
import Axios from "axios";
import qs from "qs";
import { spotifyClientId, spotifyClientSecret } from "../authConfig";
import store from ".";

Vue.use(Vuex);

export default {
  actions: {
    async getSpotifyVisitorAuth({ commit, dispatch }) {
      const headers = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: spotifyClientId,
          password: spotifyClientSecret,
        },
      };
      const data = {
        grant_type: "client_credentials",
      };

      try {
        const res = await spotifyAuthApi.post(
          "token",
          qs.stringify(data),
          headers
        );
        // console.log(res.data.access_token, "Bearer Token For Non Owner");
        let spotifyAuthToken = res.data.access_token;
        commit("setSpotifyVisitorAuth", spotifyAuthToken);
      } catch (error) {
        console.log(error, "Failed");
      }
    },

    async searchBySong({ commit, dispatch, state }, query) {
      let filtered;
      try {
        const res = await spotifyApi.get(
          "search?q=" +
            query.data +
            "&type=track" +
            "&limit=10&" +
            "offset=" +
            query.page,
          {
            headers: {
              Authorization: "Bearer " + store.state.spotifyAuthToken,
            },
          }
        );
        if (store.state.settings.noexplicit == true) {
          filtered = res.data.tracks.items.filter(
            (song) => song.explicit == false
          );
        } else {
          filtered = res.data.tracks.items;
        }
        commit("setTrackSearchResults", filtered);
        commit("updateTrackPage", true);
        console.log("tracks", filtered);
        return res.data;
      } catch (error) {
        console.error(error);
        commit("updateTrackPage", false);
      }
    },
  },
};
