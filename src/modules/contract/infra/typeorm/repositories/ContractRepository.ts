import { getRepository, Repository } from 'typeorm'

import Contract from '@modules/contract/infra/typeorm/entities/Contract'

import IContractRepository from '@modules/contract/repositories/IContractRepository'
import ICreateContractDTO from '@modules/contract/useCases/Contract/ICreateContractDTO'

class ContractRepository implements IContractRepository {
  private ormRepository: Repository<Contract>

  constructor() {
    this.ormRepository = getRepository(Contract)
  }

  public async create({
    name,
    email,
    cpf,
    loan_amount,
    monthly_income,
    date_of_birth,
    marital_status,
    address
  }: ICreateContractDTO): Promise<Contract> {
    const contract = this.ormRepository.create({
      name,
      email,
      cpf,
      loan_amount,
      monthly_income,
      date_of_birth,
      marital_status,
      address,
      state: 'upload_of_images'
    })

    await this.ormRepository.save(contract)

    return contract
  }
}

export default ContractRepository
