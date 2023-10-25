import { RequestHandler } from 'express'
import {
  createMeetingAuth,
  getAccessTokenFromZoom,
  getUserDataFromZoom,
  meetingFromZoom
} from './zoom.service'
import { controllerHandlerError } from '../../utils/handlerErrors'
import { CreateMeetingDTO, CreateMeetingSignatureDTO } from './dto/zoom'
import { validateAndCreate } from '../../utils/validateInstance'

const getAccessToken: RequestHandler = async (_req, res) => {
  try {
    const token = await getAccessTokenFromZoom()
    res.status(200).json(token)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error en la solicitud' })
  }
}

const getUser: RequestHandler = async (req, res) => {
  const { email } = req.params

  try {
    const user = await getUserDataFromZoom(email)
    res.status(200).json(user)
  } catch (error) {
    controllerHandlerError(res, error)
  }
}

const createMeeting: RequestHandler = async (req, res) => {
  try {
    const body: CreateMeetingDTO = req.body

    const validatedBody = await validateAndCreate(body, CreateMeetingDTO)
    const meeting = await meetingFromZoom(validatedBody)

    res.status(201).json(meeting)
  } catch (error) {
    controllerHandlerError(res, error)
  }
}

const createMeetingSignature: RequestHandler = async (req, res) => {
  const body: CreateMeetingSignatureDTO = req.body

  const validateBody = await validateAndCreate(body, CreateMeetingSignatureDTO)

  try {
    const signature = createMeetingAuth(validateBody)
    res.status(200).json(signature)
  } catch (error) {
    controllerHandlerError(res, error)
  }
}

export { getAccessToken, getUser, createMeeting, createMeetingSignature }
