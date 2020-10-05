import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import cpfValidate from '@shared/utils/cpfValidate'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'

interface IRequest {
  name: string
  email: string
  cpf: string
  monthly_income: number
  date_of_birth: string
  marital_status: string
  address: string
}

@injectable()
class CreateUserUseCases {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({
    name,
    email,
    cpf,
    monthly_income,
    date_of_birth,
    marital_status,
    address
  }: IRequest): Promise<User> {
    if (!cpfValidate(cpf)) {
      throw new AppError('Sorry, cpf invalid!')
    }

    const user = await this.userRepository.create({
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    return user
  }
}

export default CreateUserUseCases
