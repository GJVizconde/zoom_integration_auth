import { Router } from 'express'
import { getAccessToken, getUser } from './zoom.controller'

const zoomRouter = Router()

zoomRouter.post('/oauth', getAccessToken)
zoomRouter.get('/user/:email', getUser)

export default zoomRouter
