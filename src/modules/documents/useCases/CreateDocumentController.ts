import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateDocumentUseCases from './CreateDocumentUseCases'

class CreateDocumentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const documents = request.files
    const { contract_id } = request.query

    const createDocument = container.resolve(CreateDocumentUseCases)

    const document = await createDocument.execute(
      documents,
      String(contract_id)
    )

    return response.json({
      document_id: document.id,
      ...document
    })
  }
}

export default CreateDocumentController
