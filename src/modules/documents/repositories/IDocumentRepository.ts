import Document from '@modules/documents/infra/typeorm/entities/Document'

import ICreateDocumentDTO from '../useCases/ICreateDocumentDTO'

export default interface IDocumentRepository {
  create: (documents: ICreateDocumentDTO) => Promise<Document>
}
