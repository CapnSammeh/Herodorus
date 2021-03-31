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
import { UserDetail } from './entity/UserDetail/UserDetail';
import { UserRepository } from './entity/UserDetail/UserRepository';

//Import Middleware
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

//Import Data Providers/Models
import createHttpError from 'http-errors';

//Passport.JS
import passport from 'passport';
import './passport';

/* Run the Server */
//Make a connection to the DB
const data = createConnection({ type: "postgres", url: process.env.DEV_DATABASE_URL, entities: [UserDetail], synchronize: true })

//When resolved (i.e., the Database has been connected to)...
Promise.resolve(data).then(async connection => {
  //Declare the Repositories for TypeORM
  const userDetail = connection.getRepository(UserDetail);
  const userRepository = getCustomRepository(UserRepository);

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
        saveUninitialized: true
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
    .get('/api/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'] }))

  // Take over after successful login
  app
    .get('/api/auth/spotify/callback',
      function (req: Request, res: Response, next) {
        passport.authenticate('spotify', async function (err: Error, user: any, _info: any) {
          //If we see any errors, throw error
          if (err) {
            return next(err)
          }
          //Else, if we don't see a valid user in the response, dump em back to the homepage.
          if (!user) {
            return res.redirect('/')
          }
          //TODO:Passport Stamp and Session Handling Logic
          const appUser = userDetail.create({
            spotify_id: user.id,
            email: user._json.email,
            display_name: user._json.display_name,
            access_token: user.accessToken,
            refresh_token: user.refreshToken
          })

          const saveUser = await userRepository.stampPassport(appUser);
          if (saveUser) {
            req.logIn(saveUser, function(err){
              if(err) {
                return next(createHttpError(500, "Error Logging into Express Session"))
              }
              return res.redirect('http://localhost:8080/art_page');
            })
          } else {
            createHttpError(400, res);
          }
        })(req, res, next)
      })

  //TODO: Manage Sessions/Logout

  //FIXME: This is current broken; spinning wheel on logout.
  app
    .get('/api/logout', function (req: Request, res: Response) {
      //Handle the session termination here
      req.logout();
      res.send()
      res.redirect('http://localhost:8080/')
    });

  //Listen on Ports...
  app
    .listen(port, () => console.log(`server is listening on http://localhost:${port}`))

})
