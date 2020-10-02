import { container } from 'tsyringe'

import UserRepository from '../typeorm/repositories/UserRepository'
import IUserRepository from '../../repositories/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
