import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateDocumentsUseCases from '@modules/documents/useCases/UpdateDocumentsUseCases'

import { IFileNames } from './ICreateDocumentDTO'

class UpdateDocumentController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { document_id } = request.query

    let fileNames: IFileNames
    for (let file = 0; file < request.files.length; file++) {
      fileNames = {
        ...fileNames,
        [request.files[file].fieldname]: request.files[file].filename
      }
    }

    const updateDocuments = container.resolve(UpdateDocumentsUseCases)

    const updatedDocuments = await updateDocuments.execute(
      fileNames,
      String(document_id)
    )

    return response.json(updatedDocuments)
  }
}

export default UpdateDocumentController
