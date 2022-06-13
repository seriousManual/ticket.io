import winston from 'winston'

let format = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple()
)

const transport = new winston.transports.Console()

if (process.env.NODE_ENV === 'production') {
  format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
}

if (process.env.NODE_ENV === 'test') {
  transport.silent = true
}

export default winston.createLogger({
  level: 'debug',
  format,
  transports: [transport]
})