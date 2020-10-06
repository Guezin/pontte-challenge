import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListContractUseCases from '@modules/contracts/useCases/ListContractUseCases'

class ListContractController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.params
    const listContract = container.resolve(ListContractUseCases)

    const contract = await listContract.execute(contract_id)

    return response.json(
      classToClass({ contract_id: contract.id, ...contract })
    )
  }
}

export default ListContractController
