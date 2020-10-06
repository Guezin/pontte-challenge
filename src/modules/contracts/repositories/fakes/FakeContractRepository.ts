import { uuid } from 'uuidv4'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'

import IContractRepository, {
  ISaveDocuments
} from '@modules/contracts/repositories/IContractRepository'
import ICreateContractDTO from '@modules/contracts/useCases/ICreateContractDTO'

class FakeContractRepository implements IContractRepository {
  private contracts: Contract[]

  constructor() {
    this.contracts = []
  }

  public async listContracts(): Promise<Contract[]> {
    return this.contracts
  }

  public async findById(contract_id: string): Promise<Contract | undefined> {
    const contract = this.contracts.find(
      contract => contract.id === contract_id
    )

    return contract
  }

  public async findByUserId(user_id: string): Promise<Contract | undefined> {
    const contract = this.contracts.find(
      findContract => findContract.user_id === user_id
    )
    return contract
  }

  public async create({
    loan_amount,
    user_id
  }: ICreateContractDTO): Promise<Contract> {
    const contract = new Contract()

    Object.assign(contract, {
      id: uuid(),
      loan_amount,
      user_id
    })

    this.contracts.push(contract)

    return contract
  }

  public async save(contract: Contract): Promise<Contract> {
    const findContractIndex = this.contracts.findIndex(
      findContract => findContract.id === contract.id
    )

    this.contracts[findContractIndex] = contract

    return contract
  }

  public async saveDocuments({
    document_id,
    contract_id
  }: ISaveDocuments): Promise<Contract> {
    const contract = this.contracts.find((findContract, index) => {
      if (findContract.id === contract_id) {
        findContract.document_id = document_id
        findContract.state = 'approval'

        this.contracts[index] = findContract
      }
    })

    return contract
  }
}

export default FakeContractRepository
