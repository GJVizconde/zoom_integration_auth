import { Router } from 'express'
import { createMeeting, createMeetingSignature, getAccessToken, getUser } from './zoom.controller'

const zoomRouter = Router()

zoomRouter.post('/oauthServertoServer', getAccessToken)
zoomRouter.get('/user/:email', getUser)
zoomRouter.post('/createMeeting', createMeeting)
zoomRouter.post('/createMeetingSignature', createMeetingSignature)

export default zoomRouter
