import { Request, Response } from 'express'
import { getAccessTokenFromZoom, getUserDataFromZoom } from './zoom.service'
import { controllerHandlerError } from '../../utils/handlerErrors'

const getAccessToken = async (_req: Request, res: Response) => {
  try {
    const token = await getAccessTokenFromZoom()
    res.status(200).json(token)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error en la solicitud' })
  }
}

const getUser = async (req: Request, res: Response) => {
  const { email } = req.params

  try {
    const user = await getUserDataFromZoom(email as string)
    res.status(200).json(user)
  } catch (error) {
    controllerHandlerError(res, error)
  }
}

export { getAccessToken, getUser }
