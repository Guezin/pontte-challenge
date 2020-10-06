import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import cpfValidate from '@shared/utils/cpfValidate'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

interface IRequest {
  user_id: string
  name: string
  email: string
  cpf: string
  monthly_income: number
  date_of_birth: string
  marital_status: string
  address: string
}

@injectable()
class UpdateUserUseCases {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute({
    user_id,
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

    const user = await this.userRepository.findById(user_id)
    const contract = await this.contractRepository.findByUserId(user_id)

    if (!user) {
      throw new AppError('Sorry, user not found')
    }

    if (contract.state === 'approved') {
      throw new AppError('Unable to update, contract in approved status', 401)
    } else if (contract.state === 'rejected') {
      throw new AppError('Unable to update, contract in rejected status', 401)
    }

    const updatedUser = Object.assign(user, {
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    const reponse = await this.userRepository.save(updatedUser)

    return reponse
  }
}

export default UpdateUserUseCases
