import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import type { DataSource } from 'typeorm'

import logMW from './middlewares/log'
import getErrorHandler from './errorHandler'
import getRoutes from './routes/routes'

import TicketService from './services/Ticket'

function getServer(dataSource: DataSource) {
  const ticketService = new TicketService(dataSource)

  return express()
    .use(cors())
    .use(bodyParser.json())
    .use(logMW())

    .use('/api', getRoutes(ticketService))
    
    .use(getErrorHandler())
}

export default getServer