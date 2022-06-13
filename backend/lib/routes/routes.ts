import { Router, Request, Response } from 'express'

import TicketService from '../services/Ticket'
import { asyncRouteWrapper, BadRequestError } from '../util'

function getRoutes(ticketService: TicketService) {
  return Router()
    .get('/event', asyncRouteWrapper(async (req: Request) => {
      return ticketService.getEvents()
    }))
    .get('/event/:eventId', asyncRouteWrapper(async (req: Request) => {
      return ticketService.getEvent(req.params.eventId)
    }))
    .post('/event', asyncRouteWrapper(async (req: Request, res: Response) => {
      const { title, date, city } = req.body
      if (!title || !date || !city) {
        throw new BadRequestError('title, date and city are mandatory')
      }

      const createdEvent = await ticketService.addEvent(title, new Date(date), city)
      res.status(201)
      
      return createdEvent
    }))
    .put('/event/:eventId', asyncRouteWrapper(async (req: Request) => {
      const { body, title } = req.body
      if (!body || !title) {
        throw new BadRequestError('body or title missing')
      }

      return ticketService.updateEvent(req.params.eventId, title, body)
    }))
    .delete('/event/:eventId', asyncRouteWrapper(async (req: Request) => {
      return ticketService.deleteEvent(req.params.eventId)
    }))

    .get('/event/:eventId/ticket', asyncRouteWrapper(async (req: Request) => {
      return (await ticketService.getEvent(req.params.eventId)).tickets
    }))
    .post('/event/:eventId/ticket', asyncRouteWrapper(async (req: Request, res: Response) => {
      const eventId = req.params.eventId
      const { firstName, lastName } = req.body

      await ticketService.getEvent(eventId)

      const createdTicket = ticketService.addTicket(eventId, firstName, lastName)
      res.status(201)

      return createdTicket
    }))
    .delete('/ticket/:ticketId', asyncRouteWrapper(async (req: Request) => {
      const ticketId = req.params.ticketId
      await ticketService.getTicket(ticketId)

      return ticketService.deleteTicket(ticketId)
    }))

}

export default getRoutes