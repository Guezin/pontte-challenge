import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import CreateUserUseCases from '@modules/users/useCases/CreateUserUseCases'

import AppError from '@shared/errors/AppError'
import cpfValidate from '@shared/utils/cpfValidate'

let fakeUserRepository: FakeUserRepository
let createUserUseCases: CreateUserUseCases

describe('CreateUserUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUserUseCases = new CreateUserUseCases(fakeUserRepository)
  })

  it('should be able to create user', async () => {
    const user = await createUserUseCases.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    expect(user).toHaveProperty('id')
    expect(cpfValidate(user.cpf)).toBe(true)
  })

  it('should not be able to create user with cpf invalid', async () => {
    await expect(
      createUserUseCases.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: 'cpf_invalid',
        date_of_birth: '30/11/1995',
        marital_status: 'solteiro',
        address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
        monthly_income: 5000
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
