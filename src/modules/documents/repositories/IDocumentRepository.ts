import Document from '@modules/documents/infra/typeorm/entities/Document'

import ICreateDocumentDTO from '../useCases/ICreateDocumentDTO'

export default interface IDocumentRepository {
  create: (contract: ICreateDocumentDTO) => Promise<Document>
}
