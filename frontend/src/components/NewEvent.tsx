import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Facade from '../lib/Facade'

function Home() {
  const titleInput = useRef(null)
  const dateInput = useRef(null)
  const cityInput = useRef(null)

  const navigate = useNavigate()

  async function sendTicket() {
    await Facade.addEvent(titleInput.current.value, dateInput.current.value, cityInput.current.value)
  }

  return (
    <>
      <h1>New Event</h1>

      <div className="admin-form">
          <h4>Neues Event</h4>
          <input type="text" placeholder="Title" ref={titleInput} />
          <input type="date" placeholder="Date" ref={dateInput} />
          <input type="text" placeholder="City" ref={cityInput} />

          <button onClick={sendTicket}>Send</button>
      </div>

      <a onClick={() => navigate('/')}>⬅ Back</a>
    </>
  )
}

export default Home