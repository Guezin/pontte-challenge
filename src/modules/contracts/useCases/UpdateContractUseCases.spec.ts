import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import UpdateContractUseCases from '@modules/contracts/useCases/UpdateContractUseCases'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let updateContractUseCases: UpdateContractUseCases

describe('UpdateContractUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    updateContractUseCases = new UpdateContractUseCases(fakeContractRepository)
  })

  it('should be able to update contract', async () => {
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

    const updatedContract = await updateContractUseCases.execute({
      contract_id: contract.id,
      loan_amount: 200000
    })

    expect(updatedContract.loan_amount).toBe(200000)
  })

  it('should not be able to update contract if does not exist', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await expect(
      updateContractUseCases.execute({
        contract_id: 'non-exist',
        loan_amount: 200000
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update contract with state approved', async () => {
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

    contract.state = 'approved'

    await fakeContractRepository.save(contract)

    await expect(
      updateContractUseCases.execute({
        contract_id: contract.id,
        loan_amount: 200000
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update contract with state rejected', async () => {
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

    contract.state = 'rejected'

    await fakeContractRepository.save(contract)

    await expect(
      updateContractUseCases.execute({
        contract_id: contract.id,
        loan_amount: 200000
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
