import { useNavigate } from 'react-router-dom'

import useTickets from '../state/tickets'
import useEvents from '../state/events'

function Sidebar() {
  const navigate = useNavigate()

  const tickets = useTickets()
  const { events } = useEvents()

  function gotoEvent(eventId: string) {
    navigate(`/event/${eventId}`)
  }

  return (
    <aside>
      <h2>Latest Events</h2>
      {
        events.map(event => {
          return (
            <div key={event.eventId}>
              <h3 onClick={() => gotoEvent(event.eventId)}>{event.title}</h3>
            </div>
          )
        })
      }

      <h2>Latest Tickets</h2>
      {
        tickets.slice(0, 5).map(ticket => {
          return (
            <div key={ticket.ticketId}>
              <h3>{ticket.firstName} {ticket.lastName}</h3>
            </div>
          )
        })
      }
    </aside>
  )
}

export default Sidebar