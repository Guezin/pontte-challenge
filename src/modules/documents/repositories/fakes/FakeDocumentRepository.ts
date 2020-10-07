import { uuid } from 'uuidv4'

import Document from '@modules/documents/infra/typeorm/entities/Document'

import IDocumentRepository from '@modules/documents/repositories/IDocumentRepository'
import ICreateDocumentDTO from '@modules/documents/useCases/ICreateDocumentDTO'
import IUpdateDocumentDTO from '@modules/documents/useCases/IUpdateDocumentDTO'

class FakeDocumentRepository implements IDocumentRepository {
  private documents: Document[]

  constructor() {
    this.documents = []
  }

  public async create({
    fileNames,
    contract_id
  }: ICreateDocumentDTO): Promise<Document> {
    const document = new Document()

    Object.assign(document, {
      id: uuid(),
      contract_id,
      personal_document: fileNames.personal_document,
      proof_of_income: fileNames.proof_of_income,
      immobile: fileNames.immobile
    })

    this.documents.push(document)

    return document
  }

  public async findById(document_id: string): Promise<Document | undefined> {
    const documents = this.documents.find(
      document => document.id === document_id
    )

    return documents
  }

  public async save({
    document_id,
    fileNames
  }: IUpdateDocumentDTO): Promise<Document> {
    const documents = this.documents.find(
      document => document.id === document_id
    )

    const { personal_document, proof_of_income, immobile } = fileNames

    Object.assign(documents, {
      personal_document,
      proof_of_income,
      immobile
    })

    return documents
  }
}

export default FakeDocumentRepository
