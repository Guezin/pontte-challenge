import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateDocumentsUseCases from '@modules/documents/useCases/UpdateDocumentsUseCases'

class UpdateDocumentController {
  public async update(request: Request, response: Response): Promise<Response> {
    const documents = request.files
    const { document_id } = request.query

    const updateDocuments = container.resolve(UpdateDocumentsUseCases)

    const updatedDocuments = await updateDocuments.execute(
      documents,
      String(document_id)
    )

    return response.json(updatedDocuments)
  }
}

export default UpdateDocumentController
