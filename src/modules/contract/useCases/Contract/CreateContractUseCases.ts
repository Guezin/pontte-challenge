import Contract from '@modules/contract/infra/typeorm/entities/Contract'
import ContractRepository from '@modules/contract/infra/typeorm/repositories/ContractRepository'

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

class CreateContractUseCases {
  private contractRepository: ContractRepository

  constructor() {
    this.contractRepository = new ContractRepository()
  }

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
    const contract = this.contractRepository.create({
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
