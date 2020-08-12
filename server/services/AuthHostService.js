// import { dbContext } from "../db/DbContext"
// import { BadRequest } from "../utils/Errors"


// class AuthHostService { 

//   async authorizeHost(spotifyApiData){
//     let res = await 
//   }
// }

// const SpotifyWebApi = require('spotify-web-api-node');
// let scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']

// require('dotenv').config();

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: 'http://localhost:8080',
// });

// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/login', (req, res) => {
//   var html = spotifyApi.createAuthorizeURL(scopes)
//   console.log(html)
//   res.send(html + "&show_dialog=true")
// })

// router.get('/callback', async (req, res) => {
//   const { code } = req.query;
//   console.log(code)
//   try {
//     var data = await spotifyApi.authorizationCodeGrant(code)
//     const { access_token, refresh_token } = data.body;
//     spotifyApi.setAccessToken(access_token);
//     spotifyApi.setRefreshToken(refresh_token);

//     res.redirect('http://localhost:3001/home');
//   } catch (err) {
//     res.redirect('/#/error/invalid token');
//   }
// });

// export const AuthHostService = new AuthHostService()