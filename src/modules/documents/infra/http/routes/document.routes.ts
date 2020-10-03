import { Router, IRouter } from 'express'
import multer, { Multer } from 'multer'

import uploadConfig from '@config/multer'
import CreateDocumentController from '@modules/documents/useCases/CreateDocumentController'

class DocumentRoutes {
  public readonly routes: IRouter
  private createDocument: CreateDocumentController
  private upload: Multer

  constructor() {
    this.routes = Router()
    this.createDocument = new CreateDocumentController()
    this.upload = multer(uploadConfig)

    this.init()
  }

  private init() {
    this.routes.post('/', this.upload.any(), this.createDocument.store)
  }
}

export default new DocumentRoutes().routes
