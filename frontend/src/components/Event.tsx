import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Facade from '../lib/Facade'

import useEvents from '../state/events'

function Event() {
    const navigate = useNavigate()
    const { eventId } = useParams()

    const { events } = useEvents()
    const myEvent = events.find(event => event.eventId === eventId)

    if (myEvent === undefined) {
        return <div>sorry, not found.</div>
    }

    const firstNameInput = useRef(null)
    const lastNameInput = useRef(null)

    async function sendTicket() {
        await Facade.addTicket(
            myEvent.eventId, 
            firstNameInput.current?.value, 
            lastNameInput.current?.value
        )
        firstNameInput.current.value = ''
        lastNameInput.current.value = ''
    }

    return (
        <div className="event-details">
            <h1>
                {myEvent.title} ({myEvent.city})
                <span>{myEvent.date.toLocaleDateString()}</span>
            </h1>

            <div className="event-body">{myEvent.body}</div>

            <h4>Tickets</h4>
            <div className="event-tickets">
                {
                    myEvent.tickets.length === 0 ? 
                        <div>no tickets yet!</div> :
                        myEvent.tickets.map(ticket => {
                            return (
                                <div key={ticket.ticketId}>
                                    <h5>{ticket.firstName} {ticket.lastName}</h5>
                                </div>
                            )
                        })
                }
            </div>

            <div className="ticket-form">
                <h4>New ticket</h4>
                <input type="text" placeholder="FirstName" ref={firstNameInput} />
                <input type="text" placeholder="LastName" ref={lastNameInput} />

                <button onClick={sendTicket}>Send</button>
            </div>

            <a onClick={() => navigate('/')}>⬅ Back</a>
        </div>
    )
}

export default Event