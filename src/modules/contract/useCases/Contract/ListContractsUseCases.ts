import { inject, injectable } from 'tsyringe'

import Contract from '@modules/contract/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contract/repositories/IContractRepository'

@injectable()
class ListContractsUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(): Promise<Contract[]> {
    const contract = await this.contractRepository.listAllContracts()

    return contract
  }
}

export default ListContractsUseCases
