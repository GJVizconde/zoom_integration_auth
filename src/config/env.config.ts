import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID
export const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID
export const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET
export const ZOOM_OWNER_EMAIL = process.env.ZOOM_OWNER_EMAIL
export const ZOOM_MEETING_SDK_KEY = process.env.ZOOM_MEETING_SDK_KEY
export const ZOOM_MEETING_SDK_SECRET = process.env.ZOOM_MEETING_SDK_SECRET
