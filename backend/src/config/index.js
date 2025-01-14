import { config } from 'dotenv'
config()

const { PORT, DB_URL, ACCESS_TOKEN_SECRET, TMDB_API_KEY, FRONTEND_URL } = process.env

export const Config = {
    PORT,
    DB_URL,
    ACCESS_TOKEN_SECRET,
    TMDB_API_KEY,
    FRONTEND_URL
}
