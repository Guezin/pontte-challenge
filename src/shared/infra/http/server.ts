import 'reflect-metadata'
import 'dotenv/config'
import express, { json, Express } from 'express'

import '@shared/infra/typeorm/database'
import '../container'

import Routes from './routes/index.routes'

class Server {
  private server: Express
  private PORT: number

  constructor() {
    this.server = express()
    this.PORT = 3333

    this.middlewares()
    this.init()
  }

  private middlewares() {
    this.server.use(json())
    this.server.use(Routes)
  }

  private init() {
    this.server.listen(this.PORT, () =>
      console.log(`Server is running http://localhost:${this.PORT}`)
    )
  }
}

export default new Server()
