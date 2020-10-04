import { Router, IRouter } from 'express'
import multer, { Multer } from 'multer'

import uploadConfig from '@config/multer'
import CreateDocumentController from '@modules/documents/useCases/CreateDocumentController'
import UpdateDocumentsController from '@modules/documents/useCases/UpdateDocumentsController'

class DocumentRoutes {
  public readonly routes: IRouter

  private upload: Multer
  private createDocument: CreateDocumentController
  private updateDocuments: UpdateDocumentsController

  constructor() {
    this.routes = Router()
    this.upload = multer(uploadConfig)
    this.createDocument = new CreateDocumentController()
    this.updateDocuments = new UpdateDocumentsController()

    this.init()
  }

  private init() {
    this.routes.post('/', this.upload.any(), this.createDocument.store)
    this.routes.put('/update', this.upload.any(), this.updateDocuments.update)
  }
}

export default new DocumentRoutes().routes
