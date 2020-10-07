import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'

import CreateContractUseCases from '@modules/contracts/useCases/CreateContractUseCases'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let createContractUseCases: CreateContractUseCases

describe('CreateContractUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    createContractUseCases = new CreateContractUseCases(fakeContractRepository)
  })

  it('should be able to create contract', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    const contract = await createContractUseCases.execute({
      user_id: user.id,
      loan_amount: 150000
    })

    expect(contract).toHaveProperty('id')
  })
})
