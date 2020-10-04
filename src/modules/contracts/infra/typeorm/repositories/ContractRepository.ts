import { getRepository, Repository } from 'typeorm'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'

import IContractRepository, {
  ISaveDocuments
} from '@modules/contracts/repositories/IContractRepository'
import ICreateContractDTO from '@modules/contracts/useCases/ICreateContractDTO'

class ContractRepository implements IContractRepository {
  private ormRepository: Repository<Contract>

  constructor() {
    this.ormRepository = getRepository(Contract)
  }

  public async listContracts(): Promise<Contract[]> {
    const contracts = await this.ormRepository.find({
      relations: ['documents']
    })

    return contracts
  }

  public async findById(contract_id: string): Promise<Contract | undefined> {
    const contract = await this.ormRepository.findOne({
      where: { id: contract_id },
      relations: ['documents']
    })

    return contract
  }

  public async findByUserId(user_id: string): Promise<Contract | undefined> {
    const contract = await this.ormRepository.findOne({
      where: { user_id: user_id }
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

  public async save(contract: Contract): Promise<void> {
    await this.ormRepository.save(contract)
  }

  public async saveDocuments({
    document_id,
    contract_id
  }: ISaveDocuments): Promise<void> {
    const contract = await this.ormRepository.findOne({
      where: { id: contract_id }
    })

    contract.document_id = document_id
    contract.state = 'approval'

    await this.ormRepository.save(contract)
  }
}

export default ContractRepository
