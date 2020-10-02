import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListContractsUseCases from '@modules/contract/useCases/Contract/ListContractsUseCases'

class ListContractsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContracts = container.resolve(ListContractsUseCases)

    const contracts = await listContracts.execute()

    return response.json(contracts)
  }
}

export default ListContractsController
