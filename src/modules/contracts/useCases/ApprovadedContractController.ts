import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ApprovadedContractUseCases from './ApprovadedContractUseCases'

class ApprovadedContractController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { contract_id } = request.body

    const approvadedContract = container.resolve(ApprovadedContractUseCases)

    const contract = await approvadedContract.execute(contract_id)

    return response.json(contract)
  }
}

export default ApprovadedContractController
