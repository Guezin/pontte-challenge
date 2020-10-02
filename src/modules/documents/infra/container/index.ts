import { container } from 'tsyringe'

import DocumentRepository from '../typeorm/repositories/DocumentRepository'
import IDocumentRepository from '../../repositories/IDocumentRepository'

container.registerSingleton<IDocumentRepository>(
  'DocumentRepository',
  DocumentRepository
)
