import { Request, Response } from 'express'

import CreateContractUseCases from './CreateContractUseCases'

class CreateContractController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      loan_amount,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    } = request.body

    const createContract = new CreateContractUseCases()

    const contract = await createContract.execute({
      name,
      email,
      cpf,
      loan_amount,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    return response.json(contract)
  }
}

export default CreateContractController
