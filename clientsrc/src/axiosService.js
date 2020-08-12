import Axios from "axios"
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'
export const api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})
export const spotifyAuthApi = Axios.create({
  baseURL: "https://accounts.spotify.com/api/",
  timeout: 3000,
  withCredentials: true
})

export const spotifyAuthHost = Axios.create({
  baseURL: "https://accounts.spotify.com/",
  timeout: 3000,

})

export const spotifyApi = Axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 3000
})


