import express from 'express';
import BaseController from '../utils/BaseController';
// import { AuthHostService } from '../services/AuthHostService.js'

const SpotifyWebApi = require('spotify-web-api-node');
let scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:8080',
});

export class AuthHostController extends BaseController {

  constructor() {
    super("authorize")
    console.log('AuthHostController active');
    this.router
      .get('', this.authorizeHost)
  }


  async authorizeHost(req, res, next) {
    try {
      let html = await spotifyApi.createAuthorizeURL(scopes, '')
      console.log(html);
      res.redirect(html)
      // let data = await AuthHostService.authorizeHost(spotifyApi)
    } catch (error) { next(error) }


  }
}