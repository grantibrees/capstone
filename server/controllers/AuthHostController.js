import express from 'express';
import BaseController from '../utils/BaseController';
import { authHostService } from '../services/AuthHostService.js'
import auth0provider from "@bcwdev/auth0provider";


const SpotifyWebApi = require('spotify-web-api-node');
let scopes = ['streaming', 'user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
});

let unsafe = {}

export class AuthHostController extends BaseController {

  constructor() {
    super("")
    console.log('AuthHostController active');
    this.router
      .get('/login', this.authorizeHost)
      .get('/callback', this.authCallBack)
      .use(auth0provider.getAuthorizedUserInfo)
      .post('tokensave', this.setHostTokens)
      .get('tokenget', this.getHostTokens)

  }


  async authorizeHost(req, res, next) {
    try {
      let html = await spotifyApi.createAuthorizeURL(scopes, '')
      // let consoleHtml = new URL(html);
      console.log(html);
      // res.send({ url: html })
      res.redirect(html)
    } catch (error) { next(error) }

  }

  async authCallBack(req, res, next) {
    console.log("hit callback")
    const { code } = req.query;
    console.log(code)
    try {
      let data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token, expires_in } = data.body;
      console.log(data.body);

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      let payload = {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in
      }
      console.log(req.userInfo);
      //unsafe.send(payload)

      res.redirect("http://localhost:8080/#/dashboard?" + `accessToken=${access_token}&refreshToken=${refresh_token}&expiresIn=${expires_in}`)

    } catch (error) {
      res.redirect('error')
    }



  }

  async setHostTokens(req, res, next) {
    try {
      req.body.creatorEmail = req.email
      let payload = {
        email: req.params.email,
        refreshToken: req.params.refreshToken,
        accessToken: req.params.accessToken,
        expiresIn: req.params.expiresIn
      }
      await authHostService.setHostTokens(payload)
      res.send('Tokens saved')
    } catch (error) {

    }
  }

  async getHostTokens(req, res, next) {
    try {
      req.body.creatorEmail = req.email
      await authHostService.getHostTokens(req.email)
      res.send('Tokens retrieved')
    } catch (error) {

    }
  }
}
