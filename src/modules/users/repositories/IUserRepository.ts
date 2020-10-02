import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '../useCases/ICreateUserDTO'

export default interface IContractRepository {
  create: (userData: ICreateUserDTO) => Promise<User>
}
