import { Request, Response, NextFunction } from 'express'
import { QueryFailedError } from 'typeorm'
import { MulterError } from 'multer'

import AppError from '@shared/infra/errors/AppError'

export default (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ messageOfError: error.message })
  }

  if (error instanceof QueryFailedError) {
    return response.status(401).json({ messageOfError: error.message })
  }

  if (error instanceof MulterError) {
    return response.status(401).json({ messageOfError: error.code })
  }
  console.log(error)
  return response.status(500).json({ messageOfError: 'Internal Server Error' })
}
