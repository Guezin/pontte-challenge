import { uuid } from 'uuidv4'

import User from '@modules/users/infra/typeorm/entities/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/useCases/ICreateUserDTO'

class FakeUserRepository implements IUserRepository {
  private users: User[]

  constructor() {
    this.users = []
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
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      cpf,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    this.users.push(user)

    return user
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === user_id)

    return user
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(
      findUser => findUser.id === user.id
    )

    this.users[findUserIndex] = user

    return user
  }
}

export default FakeUserRepository
