
import path from 'path'
import { fileURLToPath } from 'url'


export type TokenData = {
  token: string;
  refreshToken: string;
}


// Alternative implementation to __dirname since we're in module mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const token_file_url = path.join(__dirname, 'token.txt');

// Store the access token in memory when client is running
let tokens: TokenData | undefined;
export const setTokens = (tokenData: TokenData) => { tokens = tokenData }
export const getTokens = () => tokens;


export const getAccessToken = () => {
  if(!tokens) return undefined;
  return tokens.token;
}
export const setAccessToken = (token: string) => {
  if(!tokens) return;
  tokens.token = token;
}

