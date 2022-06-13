import request from 'supertest'

import getServer from './getServer'
import { getTestDataSource } from './database/appDatasource'

const PATTERN_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
const PATTERN_ISO_DATE = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/

describe('Integration', () => {
  let dataSource
  let server

  beforeEach(async () => {
    dataSource = getTestDataSource()
    await dataSource.initialize()
    server = getServer(dataSource)
  })

  afterEach(() => {
    return dataSource.destroy()
  })

  it('should return all event', async () => {
    const resp = await request(server)
      .get('/api/event')

    expect(resp.status).toEqual(200)
    expect(resp.body).toEqual([])
  })

  it('should create a event and return it', async () => {
    const resp = await request(server)
      .post('/api/event')
      .send({title: 'title', date: '2022-02-22', city: 'Erlangen'})
      .expect('Content-Type', /json/)

    expect(resp.status).toEqual(201)
    expect(resp.body).toEqual({
      title: 'title',
      eventId: expect.stringMatching(PATTERN_UUID),
      date: expect.stringMatching(PATTERN_ISO_DATE),
      city: 'Erlangen'
    })
  })

  it('should return an error code when title, date or city are missing', async () => {
    const resp = await request(server)
      .post('/api/event')

    expect(resp.status).toEqual(400)
    expect(resp.text).toEqual('title, date and city are mandatory')
  })
})