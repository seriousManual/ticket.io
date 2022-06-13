import { useNavigate } from 'react-router-dom'

import useEvents from '../state/events'

function Home() {
  const { events } = useEvents()
  const navigate = useNavigate()

  function gotoEvent(eventId: string) {
    navigate(`/event/${eventId}`)
  }

  function gotoNew() {
    navigate('/new')
  }

  return (
    <>
      <h1>Events</h1>

      <section className="events">
        {events.map(event => {
          return <div key={event.eventId}>
            <h3 onClick={() => gotoEvent(event.eventId)}>
              {event.title} 
              <span>{event.date.toLocaleDateString()}</span>
            </h3>

            {event.tickets.length > 0 ? <h4>{event.tickets.length} ticket(s)</h4> : null}
          </div>
        })}
      </section>

      <a onClick={gotoNew}>Eventanlage ➡</a>
    </>
  )
}

export default Home