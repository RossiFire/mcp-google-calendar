import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { calendar_v3, google } from 'googleapis'


export let calendar: calendar_v3.Calendar;


export const initGoogleCalendarApi = async (access_token: string) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token });
  
    calendar = google.calendar({ version: 'v3', auth });
}


export const message = (message: string): CallToolResult => ({ content: [ { type: "text", text: message } ] });