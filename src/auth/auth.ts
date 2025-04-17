import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import { Profile } from 'passport-google-oauth20';
import * as dotenv from 'dotenv'

dotenv.config()

interface User {
    profile: Profile;
    token: string;
}

export default (passport: PassportStatic) => {
    passport.serializeUser<Express.User>((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: User, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/oauth2callback"
    },
    (token: string, refreshToken: string, profile: Profile, done) => {
        return done(null, {
            profile,
            token,
            refreshToken
        });
    }));
};