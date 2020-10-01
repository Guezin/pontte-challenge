import 'reflect-metadata'
import 'dotenv/config'
import express, { json } from 'express'

import '@shared/infra/typeorm/database'

import Routes from './routes/index.routes'

const server = express()

const PORT = 3333

server.use(json())
server.use(Routes)

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`)
)
