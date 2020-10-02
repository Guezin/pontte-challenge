import { injectable, inject } from 'tsyringe'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'

interface IRequest {
  loan_amount: number
  user_id: string
}

@injectable()
class CreateContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute({ loan_amount, user_id }: IRequest): Promise<Contract> {
    const contract = await this.contractRepository.create({
      loan_amount,
      user_id
    })

    return contract
  }
}

export default CreateContractUseCases
