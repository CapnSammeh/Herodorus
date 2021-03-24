/* Import a whole mess of stuff */
//Import Environment Vars
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

//Import Express
import express, { NextFunction } from 'express';
import session from 'express-session';
import { Application, Request, Response } from 'express';
const app: Application = express();

//Import Passport
import passport from 'passport';
const SpotifyStrategy = require('passport-spotify').Strategy;


//Import Middleware
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

//Import Data Providers/Models
import UserHandler from './models/User/UserHandler';
import DataProvider, { DataClient } from './DataProvider';

/* Setup Passport */
passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (_user, done) {
  done(null, UserHandler);
})

passport.use(
  new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
  },
    function (_accessToken: String, _refreshToken: String, _expires_in: Number, profile: any, done: any) {
      process.nextTick(function () {
        return done(null, profile);
      })
    }

  )
)

/* Run the Server */
//Make a connection to the DB
const data: Promise<DataClient> = DataProvider.create();
//When resolved (i.e., the Database has been connected to)...
Promise.resolve(data).then(() => {
  //Disable ETAG Header
  app
    .disable('etag');
  //Use the Helmet, Morgan and Session Middleware
  app
    .use(helmet())
    .use('*', function (_req, res, next){
      res.header("Access-Control-Allow-Origin", "http://localhost:8080")
      res.header("Access-Control-Allow-Headers", "X-Requested-With")
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      // res.header('Access-Control-Allow-Credentials', true)
      next(); 
    })
    .use(morgan('dev'))
    .use(
      session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
      })
    )

  //Enable Pre-Flight
  app
    .options('*', cors);

  // Initialize Passport
  /*
    Returns a middleare which must be called at the start of express apps 
    This sets _req.passport which is used prolifically by Passport
    Also sets up req.login() and req.logout().
  */
  app
    .use(passport.initialize())

  /*
    Session middleware
    This returns a middleware which will try to read a user out of the session; 
    if one is there, it will store the user in req.user, if not, it will do nothing.
  */
  app
    .use(passport.session())

  /* Manage Get Requests */
  app
    .get('/api/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }))

  // Take over after successful login
  app
    .get('/api/auth/spotify/callback', function (_req: Request, res: Response, next: NextFunction) {
      //TODO Stamp the user's passport here
      //Redirec thte user back to the React App
      res.redirect(301, 'http://localhost:8080/art_page')
      next
    })

  app
    .get('/api/logout', function (req: Request, res: Response) {
      req.logout();
      res.redirect('/');
    });

  //Listen on Ports...
  app
    .listen(port, () => console.log(`server is listening on http://localhost:${port}`))

})
