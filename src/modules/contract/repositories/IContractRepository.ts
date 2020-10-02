import Contract from '@modules/contract/infra/typeorm/entities/Contract'

import ICreateContractDTO from '../useCases/Contract/ICreateContractDTO'

export default interface IContractRepository {
  create: (contract: ICreateContractDTO) => Promise<Contract>
}
