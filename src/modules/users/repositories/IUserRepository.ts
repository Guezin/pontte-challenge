import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '../useCases/ICreateUserDTO'

export default interface IContractRepository {
  create: (userData: ICreateUserDTO) => Promise<User>
  findById: (user_id: string) => Promise<User | undefined>
  save: (user: User) => Promise<User>
}
