import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListAllContractsUseCases from '@modules/contracts/useCases/ListAllContractsUseCases'

class ListAllContractsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllContracts = container.resolve(ListAllContractsUseCases)

    const contracts = await listAllContracts.execute()

    return response.json(classToClass(contracts))
  }
}

export default ListAllContractsController
