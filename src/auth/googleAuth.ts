import open from 'open'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import auth from './auth.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { setAccessToken } from './token.js'
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.EXPRESS_SECRET) {
    throw new Error('EXPRESS_SECRET is not defined in .env file');
}


// Alternative implementation to __dirname since we're in module mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const token_file = path.join(__dirname, 'token.txt');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly', 
  'https://www.googleapis.com/auth/calendar.events.owned',
  'profile'
]
const app = express()


export async function authorizeWithGoogle(): Promise<void> {
  try{
    auth(passport);
    app.use(session({ 
      secret: process.env.EXPRESS_SECRET!,
      resave: false,
      saveUninitialized: true,
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    const tokenFromFile = fs.existsSync(token_file) ? fs.readFileSync(token_file, 'utf8') : undefined;
    if(tokenFromFile){
      setAccessToken(tokenFromFile)
      return
    }

  
    app.get('/', (req, res) => {
        res.json({
            status: 'session cookie not set'
        });
    });
    
    app.get('/auth/google', passport.authenticate('google', { scope: GOOGLE_SCOPES }));
  
    const authPromise = new Promise<string>((resolve, reject) => {
      try {
        app.get('/oauth2callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            (req, res) => {
                const token = (req.user! as any).token as string

                setAccessToken(token)
                fs.writeFileSync(token_file, token)

                res.send("<h3> ✅ Successfully logged in, you can now close this window...</h3>")
                resolve(token)
            }
        );
      } catch (error) {
        throw error
      }
    })

    const server = app.listen(3000, () => {
        open('http://localhost:3000/auth/google')
    });
  

    await authPromise;
    server.close();
    
  } catch (e){
    console.error('Error in authorization', e)
  }
}