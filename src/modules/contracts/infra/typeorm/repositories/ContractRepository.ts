import { getRepository, Repository } from 'typeorm'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'

import IContractRepository from '@modules/contracts/repositories/IContractRepository'
import ICreateContractDTO from '@modules/contracts/useCases/ICreateContractDTO'

class ContractRepository implements IContractRepository {
  private ormRepository: Repository<Contract>

  constructor() {
    this.ormRepository = getRepository(Contract)
  }

  public async listContracts(): Promise<Contract[]> {
    const contracts = await this.ormRepository.find()

    return contracts
  }

  public async findById(contract_id: string): Promise<Contract | undefined> {
    const contract = await this.ormRepository.findOne({
      where: { id: contract_id }
    })

    return contract
  }

  public async create({
    loan_amount,
    user_id
  }: ICreateContractDTO): Promise<Contract> {
    const contract = this.ormRepository.create({
      loan_amount,
      user_id: user_id,
      state: 'upload_of_images'
    })

    await this.ormRepository.save(contract)

    return contract
  }
}

export default ContractRepository
