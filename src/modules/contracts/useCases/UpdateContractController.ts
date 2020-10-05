import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateContractUseCases from '@modules/contracts/useCases/UpdateContractUseCases'

class UpdateContractController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { contract_id, loan_amount } = request.body

    const updateContract = container.resolve(UpdateContractUseCases)

    const updatedContract = await updateContract.execute({
      contract_id,
      loan_amount
    })

    return response.json(updatedContract)
  }
}

export default UpdateContractController
