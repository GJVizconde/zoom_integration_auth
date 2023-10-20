import { Response } from 'express'

export const controllerHandlerError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message })
  } else {
    return res.status(400).json({ error: 'An unkown error occurred' })
  }
}

// Service Error
export const serviceHandlerError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    throw error
  } else {
    throw new Error(defaultMessage)
  }
}
