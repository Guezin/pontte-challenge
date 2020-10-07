import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeMailProvider from '@shared/infra/container/providers/MailProvider/fakes/FakeMailProvider'

import RejectedContractUseCases from '@modules/contracts/useCases/RejectedContractUseCases'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let fakeMailProvider: FakeMailProvider
let rejectedContractUseCases: RejectedContractUseCases

describe('RejectedContractUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    fakeMailProvider = new FakeMailProvider()
    rejectedContractUseCases = new RejectedContractUseCases(
      fakeContractRepository,
      fakeMailProvider
    )
  })

  it('should be able to reject contract', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

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
      loan_amount: 125000
    })

    contract.user = user

    await fakeContractRepository.save(contract)

    const rejectedContract = await rejectedContractUseCases.execute(contract.id)

    expect(sendMail).toHaveBeenCalled()
    expect(rejectedContract.state).toBe('rejected')
  })

  it('should not be able to reject contract if does not exist', async () => {
    await expect(
      rejectedContractUseCases.execute('non-exist')
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reject contract with state approved', async () => {
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
      rejectedContractUseCases.execute(contract.id)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reject contract with state rejected', async () => {
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
      rejectedContractUseCases.execute(contract.id)
    ).rejects.toBeInstanceOf(AppError)
  })
})
