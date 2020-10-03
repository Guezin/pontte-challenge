import { Express } from 'express'
import { injectable, inject } from 'tsyringe'

import Document from '@modules/documents/infra/typeorm/entities/Document'
import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'

interface IRequest {
  [fieldname: string]: Express.Multer.File[]
}

@injectable()
class CreateDocumentUseCases {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository
  ) {}

  public async execute(
    documents: Express.Multer.File[] | IRequest
  ): Promise<void> {
    for (let i = 0; i < documents.length; i++) {
      console.log(documents[i].fieldname)
    }
  }
}

export default CreateDocumentUseCases
