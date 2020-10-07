import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import ListAllContractsUseCases from '@modules/contracts/useCases/ListAllContractsUseCases'

let fakeUserRepository: FakeUserRepository
let fakeContractRepository: FakeContractRepository
let listAllContractsUseCases: ListAllContractsUseCases

describe('ListAllContractsUseCases', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeContractRepository = new FakeContractRepository()
    listAllContractsUseCases = new ListAllContractsUseCases(
      fakeContractRepository
    )
  })

  it('should be able to list all contracts', async () => {
    const userDoe = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      cpf: '10699945887',
      date_of_birth: '30/11/1995',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    const userTre = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      cpf: '10699945888',
      date_of_birth: '06/09/1998',
      marital_status: 'solteiro',
      address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
      monthly_income: 5000
    })

    const contractDoe = await fakeContractRepository.create({
      user_id: userDoe.id,
      loan_amount: 150000
    })

    const contractTre = await fakeContractRepository.create({
      user_id: userTre.id,
      loan_amount: 170000
    })

    const contracts = await listAllContractsUseCases.execute()

    expect(contracts).toEqual(
      expect.arrayContaining([
        {
          contract_id: contractDoe.id,
          id: contractDoe.id,
          loan_amount: contractDoe.loan_amount,
          user_id: contractDoe.user_id,
          state: 'upload_of_images'
        },

        {
          contract_id: contractTre.id,
          id: contractTre.id,
          loan_amount: contractTre.loan_amount,
          user_id: contractTre.user_id,
          state: 'upload_of_images'
        }
      ])
    )
  })
})
