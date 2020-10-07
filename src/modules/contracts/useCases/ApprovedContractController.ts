import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ApprovedContractUseCases from './ApprovedContractUseCases'

class ApprovedContractController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.body

    const approvedContract = container.resolve(ApprovedContractUseCases)

    const contract = await approvedContract.execute(contract_id)

    return response.json(contract)
  }
}

export default ApprovedContractController
