import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

interface IRequest {
  contract_id: string
  loan_amount: number
}

@injectable()
class UpdateContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute({
    contract_id,
    loan_amount
  }: IRequest): Promise<Contract> {
    const contract = await this.contractRepository.findById(contract_id)

    if (!contract) {
      throw new AppError('Sorry, contract not found!')
    }

    if (contract.state === 'approved') {
      throw new AppError('Unable to update, contract in approved status', 401)
    } else if (contract.state === 'rejected') {
      throw new AppError('Unable to update, contract in rejected status', 401)
    }

    contract.loan_amount = loan_amount

    await this.contractRepository.save(contract)

    return contract
  }
}

export default UpdateContractUseCases
