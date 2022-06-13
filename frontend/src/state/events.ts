import create from 'zustand'

import type Event from '../../../backend/lib/models/Event'

interface EventStore {
  events: Event[]
}

const useStore = create<EventStore>(() => ({ events: [] }))

export default useStore