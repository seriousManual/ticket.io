import { DataSource } from 'typeorm'
import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import type { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

import Movie from '../models/Event'
import Ticket from '../models/Ticket'

const connectionData: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [Movie, Ticket]
}

const connectionDataForTest: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [Movie, Ticket]
}

export function getTestDataSource() {
  return new DataSource(connectionDataForTest)
}

export function getDataSource() {
  return new DataSource(connectionData)
}

export default getDataSource()
