import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserUseCases from '@modules/users/useCases/UpdateUserUseCases'

class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    } = request.body

    const updateUser = container.resolve(UpdateUserUseCases)

    const user = await updateUser.execute({
      user_id,
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

export default UpdateUserController
