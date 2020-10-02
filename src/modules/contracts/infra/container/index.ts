import { container } from 'tsyringe'

import ContractRepository from '../typeorm/repositories/ContractRepository'
import IContractRepository from '../../repositories/IContractRepository'

container.registerSingleton<IContractRepository>(
  'ContractRepository',
  ContractRepository
)
