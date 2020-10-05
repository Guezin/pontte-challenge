import 'reflect-metadata'
import 'dotenv/config'
import express, { json, Express } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { errors } from 'celebrate'

import '@shared/infra/typeorm/database'
import '../container'

import Routes from './routes/index.routes'
import middlewareError from './middlewares/error'
import uploadConfig from '@config/multer'

class Server {
  public readonly server: Express
  private PORT: number

  constructor() {
    this.server = express()
    this.PORT = 3333

    this.middlewares()
    this.init()
  }

  private middlewares() {
    this.server.use(json())
    this.server.use('/files', express.static(uploadConfig.uploadsFolder))
    this.server.use(Routes)
    this.server.use(cors)
    this.server.use(errors({ statusCode: 401 }))
    this.server.use(middlewareError)
  }

  private init() {
    this.server.listen(this.PORT, () =>
      console.log(`Server is running http://localhost:${this.PORT}`)
    )
  }
}

export default new Server()
