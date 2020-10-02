import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListContractUseCases from '@modules/contract/useCases/Contract/ListContractUseCases'

class ListContractController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.params
    const listContract = container.resolve(ListContractUseCases)

    const contract = await listContract.execute(contract_id)

    return response.json(contract)
  }
}

export default ListContractController
