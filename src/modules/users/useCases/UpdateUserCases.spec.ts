import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'

import UpdateUserUseCases from '@modules/users/useCases/UpdateUserUseCases'

import AppError from '@shared/errors/AppError'
import cpfValidate from '@shared/utils/cpfValidate'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let updateUserUseCases: UpdateUserUseCases

describe('UpdateUserUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    updateUserUseCases = new UpdateUserUseCases(
      fakeUserRepository,
      fakeContractRepository
    )
  })

  it('should be able to update user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 60000
    })

    const updatedUser = await updateUserUseCases.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 10000
    })

    expect(cpfValidate(user.cpf)).toBe(true)
    expect(updatedUser.name).toEqual('John Trê')
    expect(updatedUser.email).toEqual('johntre@email.com')
    expect(updatedUser.monthly_income).toEqual(10000)
  })

  it('should not be able to update user with cpf invalid', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: 'cpf_invalid',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 60000
    })

    const {
      name,
      email,
      cpf,
      date_of_birth,
      marital_status,
      address,
      monthly_income
    } = user

    expect(cpfValidate(user.cpf)).toBe(false)
    await expect(
      updateUserUseCases.execute({
        user_id: user.id,
        name,
        email,
        cpf,
        date_of_birth,
        marital_status,
        address,
        monthly_income
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user if not exists', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 60000
    })

    const {
      name,
      email,
      cpf,
      date_of_birth,
      marital_status,
      address,
      monthly_income
    } = user

    expect(cpfValidate(user.cpf)).toBe(true)
    await expect(
      updateUserUseCases.execute({
        user_id: 'wrong-userId',
        name,
        email,
        cpf,
        date_of_birth,
        marital_status,
        address,
        monthly_income
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user if the contract is approvaded', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 60000
    })

    const contract = await fakeContractRepository.findByUserId(user.id)

    contract.state = 'approved'

    await fakeContractRepository.save(contract)

    const {
      name,
      email,
      cpf,
      date_of_birth,
      marital_status,
      address,
      monthly_income
    } = user

    expect(cpfValidate(user.cpf)).toBe(true)
    await expect(
      updateUserUseCases.execute({
        user_id: user.id,
        name,
        email,
        cpf,
        date_of_birth,
        marital_status,
        address,
        monthly_income
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user if the contract is rejected', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    await fakeContractRepository.create({
      user_id: user.id,
      loan_amount: 60000
    })

    const contract = await fakeContractRepository.findByUserId(user.id)

    contract.state = 'rejected'

    await fakeContractRepository.save(contract)

    const {
      name,
      email,
      cpf,
      date_of_birth,
      marital_status,
      address,
      monthly_income
    } = user

    expect(cpfValidate(user.cpf)).toBe(true)
    await expect(
      updateUserUseCases.execute({
        user_id: user.id,
        name,
        email,
        cpf,
        date_of_birth,
        marital_status,
        address,
        monthly_income
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
