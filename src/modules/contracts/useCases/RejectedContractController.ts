import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RejectedContractUseCases from './RejectedContractUseCases'

class RejectedContractController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.body

    const rejectedContract = container.resolve(RejectedContractUseCases)

    const contract = await rejectedContract.execute(contract_id)

    return response.json(contract)
  }
}

export default RejectedContractController
