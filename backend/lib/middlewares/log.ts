import { Request, Response, NextFunction } from 'express'
import onHeaders from 'on-headers'
import hirestime from 'hirestime'

import logging from '../logging'

function createLogMW() {
  return function logMW(req: Request, res: Response, next: NextFunction): void {
    const getElapsed = hirestime()

    onHeaders(res, () => {
      logging.info('request', {
        url: req.url,
        duration: getElapsed(),
        statusCode: res.statusCode,
        method: req.method
      })
    })

    next()
  }
}

export default createLogMW