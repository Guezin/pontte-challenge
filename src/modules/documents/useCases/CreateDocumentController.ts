import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateDocumentUseCases from './CreateDocumentUseCases'

import { IFileNames } from './ICreateDocumentDTO'

class CreateDocumentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.query

    let fileNames: IFileNames
    for (let file = 0; file < request.files.length; file++) {
      fileNames = {
        ...fileNames,
        [request.files[file].fieldname]: request.files[file].filename
      }
    }

    const createDocument = container.resolve(CreateDocumentUseCases)

    const document = await createDocument.execute(
      fileNames,
      String(contract_id)
    )

    return response.json({
      document_id: document.id,
      ...document
    })
  }
}

export default CreateDocumentController
