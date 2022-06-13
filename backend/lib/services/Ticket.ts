import { DataSource, Repository } from 'typeorm'
import Ticket from '../models/Ticket'
import Event from '../models/Event'

class TicketService {
  private eventRepository: Repository<Event>
  private ticketRepository: Repository<Ticket>

  constructor(dataSource: DataSource) {
    this.eventRepository = dataSource.getRepository(Event)
    this.ticketRepository = dataSource.getRepository(Ticket)
  }

  async getEvent(eventId: string): Promise<Event> {
    return this.eventRepository.findOneOrFail({ 
      where: { eventId }, 
      relations: ['tickets']
    })
  }

  async getEvents(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['tickets']
    })
  }

  async addEvent(title: string, date: Date, city: string): Promise<Event> {
    const newEvent = this.eventRepository.create({ title, date, city })

    return this.eventRepository.save(newEvent)
  }

  async updateEvent(eventId: string, title: string, body: string): Promise<Event> {
    const event = await this.getEvent(eventId)

    return this.eventRepository.save({ ...event, title, body })
  }

  async deleteEvent(eventId: string): Promise<Event> {
    const event = await this.getEvent(eventId)

    return this.eventRepository.remove(event)
  }

  async getTickets(eventId: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { event: { eventId }}
    })
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    return this.ticketRepository.findOneByOrFail({ ticketId })
  }

  async addTicket(eventId: string, firstName: string, lastName: string): Promise<Ticket> {
    const newTicket = this.ticketRepository.create({
      firstName, lastName, event: { eventId }
    })

    return await this.ticketRepository.save(newTicket)
  }

  async deleteTicket(ticketId: string): Promise<Ticket> {
    const ticket = await this.getTicket(ticketId)

    return this.ticketRepository.remove(ticket)
  }
}

export default TicketService