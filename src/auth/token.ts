
import path from 'path'
import { fileURLToPath } from 'url'


// Alternative implementation to __dirname since we're in module mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const token_file_url = path.join(__dirname, 'token.txt');

// Store the access token in memory when client is running
let accessToken: string | undefined = undefined;
export const setAccessToken = (token: string) => { accessToken = token }
export const getAccessToken = () => accessToken;


