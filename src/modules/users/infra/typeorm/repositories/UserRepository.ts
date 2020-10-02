import { getRepository, Repository } from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/useCases/ICreateUserDTO'

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    name,
    email,
    cpf,
    monthly_income,
    date_of_birth,
    marital_status,
    address
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    await this.ormRepository.save(user)

    return user
  }
}

export default UserRepository
