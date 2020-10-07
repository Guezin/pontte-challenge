import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ListContractUseCases from '@modules/contracts/useCases/ListContractUseCases'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let listContractUseCases: ListContractUseCases

describe('ListContractUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    listContractUseCases = new ListContractUseCases(fakeContractRepository)
  })

  it('should be able to list a specific contract', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    const contract = await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 150000
    })

    const contractFound = await listContractUseCases.execute(contract.id)

    expect(contractFound.id).toEqual(contract.id)
    expect(contractFound.user_id).toEqual(user.id)
  })

  it('should not be able to list contract if does not exist', async () => {
    await expect(
      listContractUseCases.execute('non-exist')
    ).rejects.toBeInstanceOf(AppError)
  })
})
