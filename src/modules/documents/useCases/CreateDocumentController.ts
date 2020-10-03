import { Request, Response, Express } from 'express'
import { container } from 'tsyringe'

import CreateDocumentUseCases from './CreateDocumentUseCases'

class CreateDocumentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const documents = request.files

    const createDocument = container.resolve(CreateDocumentUseCases)

    const document = await createDocument.execute(documents)

    return response.json(document)
  }
}

export default CreateDocumentController
