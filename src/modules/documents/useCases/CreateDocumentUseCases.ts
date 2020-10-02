import { injectable, inject } from 'tsyringe'

import Document from '@modules/documents/infra/typeorm/entities/Document'
import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'

interface IRequest {
  personal_document: string
  proof_of_income: string
  immobile: string
  contract_id: string
}

@injectable()
class CreateDocumentUseCases {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository
  ) {}

  public async execute({
    personal_document,
    proof_of_income,
    immobile,
    contract_id
  }: IRequest): Promise<Document> {
    const document = await this.documentRepository.create({
      personal_document,
      proof_of_income,
      immobile,
      contract_id
    })

    return document
  }
}

export default CreateDocumentUseCases
