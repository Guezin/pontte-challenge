import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Document from '@modules/documents/infra/typeorm/entities/Document'

import { IFileNames } from '@modules/documents/useCases/ICreateDocumentDTO'
import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'
import IStorageProvider from '@shared/infra/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  [fieldname: string]: Express.Multer.File[]
}

@injectable()
class UpdateDocumentUseCases {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,

    @inject('ContractRepository')
    private contractRepository: IContractRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute(
    documents: Express.Multer.File[] | IRequest,
    document_id: string
  ): Promise<Document> {
    const documentsFound = await this.documentRepository.findById(document_id)

    if (!documentsFound) {
      throw new AppError('Sorry, documents not found')
    }

    const contract = await this.contractRepository.findById(
      documentsFound.contract_id
    )

    if (contract.state === 'approved') {
      throw new AppError('Unable to update, contract in approved status', 401)
    } else if (contract.state === 'rejected') {
      throw new AppError('Unable to update, contract in rejected status', 401)
    }

    let fileNames: IFileNames
    for (let file = 0; file < documents.length; file++) {
      fileNames = {
        ...fileNames,
        [documents[file].fieldname]: documents[file].filename
      }
    }

    await this.storageProvider.deleteFile({
      personal_document: documentsFound.personal_document,
      proof_of_income: documentsFound.proof_of_income,
      immobile: documentsFound.immobile
    })

    const updatedDocuments = await this.documentRepository.save({
      fileNames,
      document_id
    })

    await this.storageProvider.saveFiles(fileNames)

    return updatedDocuments
  }
}

export default UpdateDocumentUseCases
