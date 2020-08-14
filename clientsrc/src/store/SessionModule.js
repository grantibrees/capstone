import Vue from 'vue'
import Vuex from 'vuex'
import { api, loginApi } from "../axiosService"
import store from "."
import router from '../router/index'

Vue.use(Vuex)


export default {
  actions: {
    async createSession({ commit }, sessionData) {
      try {
        console.log(sessionData)
        api.post("sessions",)
      } catch (error) {
        console.error(error)
      }

    }
  }
}