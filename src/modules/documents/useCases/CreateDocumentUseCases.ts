import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Document from '@modules/documents/infra/typeorm/entities/Document'

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'
import IStorageProvider from '@shared/infra/container/providers/StorageProvider/models/IStorageProvider'
import { IFileNames } from './ICreateDocumentDTO'

@injectable()
class CreateDocumentUseCases {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,

    @inject('ContractRepository')
    private contractRepository: IContractRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute(
    fileNames: IFileNames,
    contract_id: string
  ): Promise<Document> {
    const contract = await this.contractRepository.findById(contract_id)

    if (!contract) {
      throw new AppError('Sorry, contract not found')
    }

    if (contract.state === 'approved') {
      throw new AppError('Unable to update, contract in approved status', 401)
    } else if (contract.state === 'rejected') {
      throw new AppError('Unable to update, contract in rejected status', 401)
    }

    const document = await this.documentRepository.create({
      fileNames,
      contract_id
    })

    await this.contractRepository.saveDocuments({
      document_id: document.id,
      contract_id: document.contract_id
    })

    await this.storageProvider.saveFiles(fileNames)

    return document
  }
}

export default CreateDocumentUseCases
