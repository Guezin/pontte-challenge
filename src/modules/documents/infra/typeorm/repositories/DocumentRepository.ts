import { getRepository, Repository } from 'typeorm'

import Document from '@modules/documents/infra/typeorm/entities/Document'

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'
import ICreateDocumentDTO from '@modules/documents/useCases/ICreateDocumentDTO'
import IUpdateDocumentDTO from '@modules/documents/useCases/IUpdateDocumentDTO'

class DocumentRepository implements IDocumentRepository {
  private ormRepository: Repository<Document>

  constructor() {
    this.ormRepository = getRepository(Document)
  }

  public async create({
    fileNames,
    contract_id
  }: ICreateDocumentDTO): Promise<Document> {
    const document = this.ormRepository.create({
      contract_id,
      personal_document: fileNames.personal_document,
      proof_of_income: fileNames.proof_of_income,
      immobile: fileNames.immobile
    })

    await this.ormRepository.save(document)

    return document
  }

  public async findById(document_id: string): Promise<Document | undefined> {
    const documents = await this.ormRepository.findOne({
      where: { id: document_id }
    })

    return documents
  }

  public async save({
    document_id,
    fileNames
  }: IUpdateDocumentDTO): Promise<Document> {
    const documents = await this.ormRepository.findOne({
      where: { id: document_id }
    })

    documents.personal_document = fileNames.personal_document
    documents.proof_of_income = fileNames.proof_of_income
    documents.immobile = fileNames.immobile

    await this.ormRepository.save(documents)

    return documents
  }
}

export default DocumentRepository
