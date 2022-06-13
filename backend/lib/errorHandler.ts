import { NextFunction, Request, Response } from 'express'

import logging from './logging'
import { HttpError } from './util'

function getErrorHandler() {
  return function (error: any, req: Request, res: Response, next: NextFunction) {
    logging.error('request-error', {
      mssg: error.message,
      url: req.url
    })

    if (error instanceof HttpError) {
      res.status(error.statusCode).end(error.message)
      return
    }

    res.status(500).end(error.message) 
  }
}

export default getErrorHandler