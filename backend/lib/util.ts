import { NextFunction, Request, Response } from 'express'
import { EntityNotFoundError } from 'typeorm'

export function asyncRouteWrapper<T>(handler: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
  return function (req: Request, res: Response, next: NextFunction): void {
    handler(req, res, next).then(
      async (result: any) => res.json(result),
      error => {
        if (error instanceof EntityNotFoundError) {
          return next(new NotFoundError(error.message))
        }

        next(error)
      }
    )
  }
}

export class HttpError extends Error {
  constructor(readonly statusCode: number, message: string) {
    super(message)
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message)
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(409, message)
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message)
  }
}