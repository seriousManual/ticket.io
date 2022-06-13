import Client from './Client'

import eventsStore from '../state/events'

const Facade = {
  getEvents: async () => {
    const events = await Client.getEvents()

    const newEvents = events
      .map(event => ({ ...event, date: new Date(event.date) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    eventsStore.setState({ events: newEvents })
  },

  addEvent: async (title: string, date: Date, city: string) => {
    await Client.addEvent(title, date, city)
    await Facade.getEvents()
  },

  addTicket: async (eventId: string, firstName: string, lastName: string) => {
    await Client.addTicket(eventId, firstName, lastName)
    await Facade.getEvents()
  }
}

export default Facade