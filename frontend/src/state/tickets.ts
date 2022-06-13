import useEvents from './events'

function tickets() {
  return useEvents(({ events }) => {
    return events
      .map(event => event.tickets)
      .flat()
  })
}

export default tickets