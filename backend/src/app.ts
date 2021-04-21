/* Import a whole mess of stuff */
//Import Environment Vars
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

//Import Reflect-MetaData for TypeORM
import "reflect-metadata";

//Import Express
import express from 'express';
import session from 'express-session';
import { Application, Request, Response } from 'express';
const app: Application = express();

//TypeORM and Repositories
import { createConnection, getCustomRepository } from 'typeorm';
import { UserDetail } from './db/entity/UserDetail/UserDetail';
import { UserRepository } from './db/entity/UserDetail/UserRepository';
import { SongDetail } from './db/entity/SongDetail/SongDetail';
import { SongRepository } from './db/entity/SongDetail/SongRepository';

//Import Middleware
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

//Import Data Providers/Models
import createHttpError from 'http-errors';

//Passport.JS
import passport from 'passport';
import './utilities/passport';

//Import Spotify Calls
import { getCurrentSong, getTenSongs } from "./spotify-calls";

/* Run the Server */
//Make a connection to the DB
const data = createConnection({
  type: "postgres",
  url: process.env.DEV_DATABASE_URL,
  entities: [UserDetail, SongDetail],
  synchronize: true
})

//When resolved (i.e., the Database has been connected to)...
Promise.resolve(data).then(async connection => {
  //Declare the Repositories for TypeORM
  const userDetail = connection.getRepository(UserDetail);
  const userRepository = getCustomRepository(UserRepository);
  // const songDetail = connection.getRepository(SongDetail);
  const songRepository = getCustomRepository(SongRepository);

  //Disable ETAG Header
  app
    .disable('etag');
  //Use the Helmet, Morgan and Session Middleware
  app
    .use(helmet())
    .use('*', function (_req, res, next) {
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
        saveUninitialized: true,
        name: "id",
        cookie: {
          path: "/",
          maxAge: 1800000
        }
      })
    )

  //Enable Pre-Flight
  app
    .options('*', cors);

  // Initialize Passport
  /*
    Returns a middleare which must be called at the start of express apps 
    This sets req.passport which is used prolifically by Passport
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
    .get('/api/auth/spotify', passport.authenticate('spotify', { scope: [
      'user-read-email', 
      'user-read-private', 
      'user-read-recently-played',
      'user-read-playback-state',
      'user-read-currently-playing'
    ] }))

  // Take over after successful login
  app
    .get('/api/auth/spotify/callback',
      function (req: Request, res: Response, next) {
        passport.authenticate('spotify', async function (err: Error, user: any, _info: any) {
          if (err) { return next(err) }
          if (!user) { return next(res.redirect('/')) }
          const saveUser = await userRepository.stampPassport(userDetail.create({
            spotify_id: user.id,
            email: user._json.email,
            display_name: user._json.display_name,
            access_token: user.accessToken,
            refresh_token: user.refreshToken
          }))
          //If the user is successfully created in the db
          if (saveUser) {
            req.logIn(saveUser, function (err) {
              if (err) {
                return next(createHttpError(500, "Error Logging into Express Session"))
              }
              //TODO: Populate the DB here with some relevant information
              if (req.user) { 
                getTenSongs(req.user);
                getCurrentSong(req.user); 
              };
              
              return next(res.redirect('http://localhost:8080/art_page'));
            })
          } else {
            createHttpError(400, res);
          }
        })(req, res, next)
      })

  //TODO: Manage Sessions/Logout

  app
    .get('/api/logout', function (req: Request, res: Response, next) {
      //Handle the session termination here
      req.logout();
      return next(res.redirect('http://localhost:8080/'));
    });


  app
    .get('/api/currentsong',
      async function (req: Request, res: Response, done) {
        const user: UserDetail = req.user as UserDetail;
        if (!user) {
          done(createHttpError(403, res));
        } else {
          const songQuery = await songRepository.getCurrentSong(user.user_id);
          if (songQuery) {
            const currentSong: SongDetail = songQuery as SongDetail
            res.send(currentSong);
          } else {
            done(createHttpError(204, res))
          }
        }
      });

  app
    .get('/api/currentsongimage',
      async function (req: Request, res: Response, done) {
        const user: UserDetail = req.user as UserDetail;
        if (!user) {
          done(createHttpError(403, res));
        } else {
          const songQuery = await songRepository.getCurrentSong(user.user_id);
          if (songQuery) {
            const currentSong: SongDetail = songQuery as SongDetail
            res.send(currentSong.album_art);
          } else {
            done(createHttpError(204, res))
          }
        }
      })

  app
    .get("/api/allsongs",
      async function (req: Request, res: Response, done) {
        const user: UserDetail = req.user as UserDetail;
        if (!user) {
          done(createHttpError(403, res));
        } else {
          const songsQuery = await songRepository.getAllSongs(user.user_id);
          if (songsQuery) {
            const songList: SongDetail[] = songsQuery as SongDetail[]
            res.send(songList);
          } else {
            done(createHttpError(204, res))
          }
        }
      })

  //Listen on Ports...
  app
    .listen(port, () => console.log(`server is listening on http://localhost:${port}`))

})
