//Import Passport
import passport from 'passport';
import { getRepository } from 'typeorm';
import { UserDetail } from './entity/UserDetail/UserDetail';
const SpotifyStrategy = require('passport-spotify').Strategy;

/* Setup Passport */
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user_id: string, done) {
    const user = (async() => {getRepository(UserDetail).findOne(user_id)})
    done(null, user);
});

passport.use(
    new SpotifyStrategy({
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    },
        function (accessToken: String, refreshToken: String, _expires_in: Number, profile: any, done: any) {
            const userReponse = {
                ...profile,
                accessToken,
                refreshToken
            }
            return done(null, userReponse)
        }
    )
)