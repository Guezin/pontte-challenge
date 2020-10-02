import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateDocumentUseCases from './CreateDocumentUseCases'

class CreateDocumentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      personal_document,
      proof_of_income,
      immobile,
      contract_id
    } = request.body

    const createDocument = container.resolve(CreateDocumentUseCases)

    const document = await createDocument.execute({
      personal_document,
      proof_of_income,
      immobile,
      contract_id
    })

    return response.json(document)
  }
}

export default CreateDocumentController
