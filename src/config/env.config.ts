import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID
export const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID
export const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET
