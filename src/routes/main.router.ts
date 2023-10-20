import { Router } from 'express'
import zoomRouter from '../modules/zoom/zoom.router'

const mainRouter = Router()

mainRouter.use('/zoom', zoomRouter)

export default mainRouter
