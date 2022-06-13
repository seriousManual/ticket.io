import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import Home from './Home'
import Event from './Event'
import NewEvent from './NewEvent'

import '../styles/reset.scss'
import '../styles/styles.scss'

function App() {
  return (
    <BrowserRouter>
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:eventId" element={<Event />} />
            <Route path="/new" element={<NewEvent />} />
          </Routes>
      </main>

      <Sidebar />
    </BrowserRouter>
  )
}

export default App