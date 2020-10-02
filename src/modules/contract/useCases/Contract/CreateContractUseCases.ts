import { injectable, inject } from 'tsyringe'

import Contract from '@modules/contract/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contract/repositories/IContractRepository'

interface IRequest {
  name: string
  email: string
  cpf: string
  loan_amount: number
  monthly_income: number
  date_of_birth: string
  marital_status: string
  address: string
}

@injectable()
class CreateContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository
  ) {}

  public async execute({
    name,
    email,
    cpf,
    loan_amount,
    monthly_income,
    date_of_birth,
    marital_status,
    address
  }: IRequest): Promise<Contract> {
    const contract = await this.contractRepository.create({
      name,
      email,
      cpf,
      loan_amount,
      monthly_income,
      date_of_birth,
      marital_status,
      address
    })

    return contract
  }
}

export default CreateContractUseCases
