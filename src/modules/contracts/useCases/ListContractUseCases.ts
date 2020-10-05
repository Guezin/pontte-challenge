import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

@injectable()
class ListContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute(contract_id: string): Promise<Contract> {
    const contract = await this.contractRepository.findById(contract_id)

    if (!contract) {
      throw new AppError('Sorry, contract not found!')
    }

    return contract
  }
}

export default ListContractUseCases
