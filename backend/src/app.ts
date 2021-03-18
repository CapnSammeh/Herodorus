/* Import a whole mess of stuff */
//Import Environment Vars
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

//Import Express
import express from 'express';
import session from 'express-session';
import { Application, Request, Response } from 'express';
const app: Application = express();

//Import Passport
import passport from 'passport';
const SpotifyStrategy = require('passport-spotify').Strategy;


//Import Middleware
import morgan from 'morgan';
import helmet from 'helmet';

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
  //Use the Helmet and Morgan Middleware
  app
    .use(helmet())
    .use(morgan('dev'))
    .use(
      session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
      })
    )

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
      if one is there, it will store the user in req.user, if not, it will do nothing. Behind the scenes, this:
    */
   app
    .use(passport.session())

  //Manage Get Requests
  app
    .get('/', (_req: Request, res: Response) => {
      res.send(
        '<a href="/auth/spotify">Login</a>'
      )
    });

  app
    .get('/api/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }))

  /* 
    Returns a middleware that runs the requested Strategy (in this case, that's Spotify)
    With the response, we want to now start doing things with the db
    //TODO Do things with the DB  
  */
  app
    .get('/api/auth/spotify/callback',
      passport.authenticate('spotify', { failureRedirect: '/login' })),
    function (_req: Request, res: Response) {
      console.log(res.statusMessage);
    }

  /* 
    Log In Page
  */
  app
    .get('/api/logged_in', (req: Request, res: Response) => {
      res.send(
        '<p>{' + req.statusCode + '}Logged in!</p><a href="/logout">Logout</a>'
      )
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
