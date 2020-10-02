import Contract from '@modules/contract/infra/typeorm/entities/Contract'

import ICreateContractDTO from '../useCases/Contract/ICreateContractDTO'

export default interface IContractRepository {
  listContracts: () => Promise<Contract[]>
  create: (contract: ICreateContractDTO) => Promise<Contract>
  findByContractId: (contract_id: string) => Promise<Contract | undefined>
}
