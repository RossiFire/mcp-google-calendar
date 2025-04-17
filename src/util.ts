import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { calendar_v3, google } from 'googleapis'
import { setAccessToken, TokenData } from './auth/token.js';


export let calendar: calendar_v3.Calendar;


export const initGoogleCalendarApi = async (tokens: TokenData) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ 
        access_token: tokens.token,
        refresh_token: tokens.refreshToken
    });

    // Refresh the access token if it's expired
    const tokenInfo = await auth.getAccessToken();
    if(tokenInfo.token){
        setAccessToken(tokenInfo.token!);
    }
  
    calendar = google.calendar({ version: 'v3', auth });
}


export const message = (message: string): CallToolResult => ({ content: [ { type: "text", text: message } ] });