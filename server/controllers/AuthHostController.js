import express from 'express';
import BaseController from '../utils/BaseController';
import { authHostService } from '../services/AuthHostService.js'

const SpotifyWebApi = require('spotify-web-api-node');
let scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
});
export class AuthHostController extends BaseController {

  constructor() {
    super("")
    console.log('AuthHostController active');
    this.router
      .get('/login', this.authorizeHost)
      .get('/callback', this.authCallBack)
  }


  async authorizeHost(req, res, next) {
    try {
      let html = await spotifyApi.createAuthorizeURL(scopes, '')
      // let consoleHtml = new URL(html);
      res.redirect(html)
      
      // let data = await AuthHostService.authorizeHost(spotifyApi)
    } catch (error) { next(error) }


  }
  async authCallBack(req, res, next) {
    const { code } = req.query;
    console.log(code)
    try {
      let data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token, expires_in } = data.body;
      console.log(data.body);

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      authHostService.setHostTokens(access_token, refresh_token, expires_in)
      res.redirect('http://localhost:8080');
    } catch(error){
      res.redirect('/#/error/invalid token')
    }



  }
}