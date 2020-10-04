import Document from '@modules/documents/infra/typeorm/entities/Document'

import ICreateDocumentDTO from '../useCases/ICreateDocumentDTO'
import IUpdateDocumentDTO from '../useCases/IUpdateDocumentDTO'

export default interface IDocumentRepository {
  create: (documentsData: ICreateDocumentDTO) => Promise<Document>
  findById: (document_id: string) => Promise<Document | undefined>
  save: (documentsData: IUpdateDocumentDTO) => Promise<Document>
}
