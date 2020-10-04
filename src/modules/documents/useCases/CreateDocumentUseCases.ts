import { injectable, inject } from 'tsyringe'

import Document from '@modules/documents/infra/typeorm/entities/Document'

import { IFileNames } from '@modules/documents/useCases/ICreateDocumentDTO'
import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

interface IRequest {
  [fieldname: string]: Express.Multer.File[]
}

@injectable()
class CreateDocumentUseCases {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,

    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(
    documents: Express.Multer.File[] | IRequest,
    contract_id: string
  ): Promise<Document> {
    let fileNames: IFileNames

    for (let file = 0; file < documents.length; file++) {
      fileNames = {
        ...fileNames,
        [documents[file].fieldname]: documents[file].filename
      }
    }

    const document = await this.documentRepository.create({
      fileNames,
      contract_id
    })

    await this.contractRepository.saveDocuments({
      document_id: document.id,
      contract_id: document.contract_id
    })

    return document
  }
}

export default CreateDocumentUseCases
