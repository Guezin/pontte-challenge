import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateContractUseCases from './CreateContractUseCases'

class CreateContractController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { loan_amount, user_id } = request.body

    const createContract = container.resolve(CreateContractUseCases)

    const contract = await createContract.execute({ loan_amount, user_id })

    return response.json({
      contract_id: contract.id,
      ...contract
    })
  }
}

export default CreateContractController
