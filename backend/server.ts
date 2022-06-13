
import logging from './lib/logging'
import appDataSource from './lib/database/appDatasource' 
import getServer from './lib/getServer'

const port = process.env.BACKEND_PORT ?? 8081

appDataSource.initialize().then(dataSource => {
  const server = getServer(dataSource)

  server.listen(port, () => {
    logging.info('backend-started', { port })
  })
})

