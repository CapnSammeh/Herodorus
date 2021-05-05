//Import Passport
import passport from 'passport';
import { UserDetail } from '../db/entity/UserDetail/UserDetail';
import { getRepository } from 'typeorm';
const SpotifyStrategy = require('passport-spotify').Strategy;

/* Setup Passport */
passport.serializeUser(function (user, done) {
    const appUser = user as UserDetail;
    done(null, appUser);
}); 

passport.deserializeUser(async function (id: UserDetail, done) {    
    const userDetail = getRepository(UserDetail);
    const user = await userDetail.findOne(id.user_id);
    done(null, user);

})

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