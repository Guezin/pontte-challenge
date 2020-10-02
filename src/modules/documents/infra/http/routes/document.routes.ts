import { Router, IRouter } from 'express'

import CreateDocumentController from '@modules/documents/useCases/CreateDocumentController'

class DocumentRoutes {
  public readonly routes: IRouter
  private createDocument: CreateDocumentController

  constructor() {
    this.routes = Router()
    this.createDocument = new CreateDocumentController()

    this.init()
  }

  private init() {
    this.routes.post('/', this.createDocument.store)
  }
}

export default new DocumentRoutes().routes
