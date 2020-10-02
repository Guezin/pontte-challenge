import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAllContractsUseCases from '@modules/contract/useCases/Contract/ListAllContractsUseCases'

class ListAllContractsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllContracts = container.resolve(ListAllContractsUseCases)

    const contracts = await listAllContracts.execute()

    return response.json(contracts)
  }
}

export default ListAllContractsController
