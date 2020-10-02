import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserUseCases from './CreateUserUseCases'

class CreateUserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    } = request.body

    const createUser = container.resolve(CreateUserUseCases)

    const user = await createUser.execute({
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    return response.json(user)
  }
}

export default CreateUserController
