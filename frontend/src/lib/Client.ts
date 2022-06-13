import type Ticket from '../../../backend/lib/models/Ticket'
import type Event from '../../../backend/lib/models/Event'

export class NoConnectionError extends Error {}

export class HttpError extends Error {
  constructor(readonly statusCode: number, message: string) {
    super(message)
  }
}

const Client = {
  getEvents: (): Promise<Event[]> => {
    return httpGet<Event[]>('/api/event')
  },
  getEvent: (eventId: string): Promise<Event> => {
    return httpGet<Event>(`/api/event/${eventId}`)
  },
  addEvent: (title: string, date: Date, city: string): Promise<Event> => {
    return httpEvent<Event>(`/api/event`, { title, date, city })
  },
  updateEvent: (eventId: string, title: string, date: Date, city: string): Promise<Event> => {
    return httpPut<Event>(`/api/event/${eventId}`, { title, date, city })
  },
  deleteEvent: (eventId: string): Promise<void> => {
    return httpDelete<void>(`/api/event/${eventId}`)
  },

  getTickets: (eventId: string): Promise<Ticket[]> => {
    return httpGet<Ticket[]>(`/api/event/${eventId}/ticket`)
  },
  addTicket: (eventId: string, firstName: string, lastName: string): Promise<Ticket> => {
    return httpEvent<Ticket>(`/api/event/${eventId}/ticket`, { firstName, lastName })
  },
  removeTicket: (ticketId: string): Promise<void> => {
    return httpDelete<void>(`/api/ticket/${ticketId}`)
  }
}

async function httpGet<T>(url: string): Promise<T> {
  return await _execute<T>(url)
}

async function httpEvent<T>(url: string, data?: Record<string, any>): Promise<T> {
  return await _execute<T>(url, 'POST', data)
}

async function httpPut<T>(url: string, data?: Record<string, any>): Promise<T> {
  return await _execute<T>(url, 'PUT', data)
}

async function httpDelete<T>(url: string): Promise<T> {
  return await _execute<T>(url, 'DELETE')
}

type methods = 'GET' | 'PUT' | 'POST' | 'DELETE'

async function _execute<T>(url: string, method: methods = 'GET', bodyData?: Record<string, any>): Promise<T> {
  const body = method === 'GET' || bodyData === undefined ? undefined : JSON.stringify(bodyData)
  const headers = { 'Content-Type': 'application/json' }

  const response = await fetch(url, { method, headers, body })
  if (!response.ok) {
    throw new HttpError(response.status, await response.text())
  }

  return await response.json()
}

export default Client