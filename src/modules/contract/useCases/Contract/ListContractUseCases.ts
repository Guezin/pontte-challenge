import { inject, injectable } from 'tsyringe'

import AppError from '@shared/infra/errors/AppError'

import Contract from '@modules/contract/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contract/repositories/IContractRepository'

@injectable()
class ListContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(contract_id: string): Promise<Contract> {
    const contract = await this.contractRepository.findByContractId(contract_id)

    if (!contract) {
      throw new AppError('Sorry, contract not found!')
    }

    return contract
  }
}

export default ListContractUseCases
