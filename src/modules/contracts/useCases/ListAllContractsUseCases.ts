import { inject, injectable } from 'tsyringe'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

@injectable()
class ListAllContractsUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(): Promise<Contract[]> {
    const contracts = await this.contractRepository.listContracts()

    return contracts
  }
}

export default ListAllContractsUseCases
