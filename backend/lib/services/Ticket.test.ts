import TicketService from './Ticket'

import { getTestDataSource } from '../database/appDatasource'

const PATTERN_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

describe('TicketService', () => {
  let dataSource
  let ticketService

  beforeEach(async () => {
    dataSource = getTestDataSource()
    await dataSource.initialize()
    ticketService = new TicketService(dataSource)
  })

  afterEach(() => {
    return dataSource.destroy()
  })

  it('should return no events', async () => {
    const allEvents = await ticketService.getEvents()

    expect(allEvents).toEqual([])
  })

  it('should return events after some events have been stored', async () => {
    await ticketService.addEvent('EventTitle 1', new Date(2022, 1, 22), 'Erlangen')

    const allEvents = await ticketService.getEvents()

    expect(allEvents).toEqual([{
        title: 'EventTitle 1',
        city: 'Erlangen',
        date: expect.any(Date),
        tickets: [],
        eventId: expect.stringMatching(PATTERN_UUID),
    }])
  })
})