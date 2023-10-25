import express from 'express'
import morgan from 'morgan'
import mainRouter from './routes/main.router'
import cors from 'cors'
import { configCors } from './config/cors.config'

const app = express()

app.use(morgan('dev'))

app.use(cors(configCors))

app.use(express.json())

app.use('/api', mainRouter)

export default app
