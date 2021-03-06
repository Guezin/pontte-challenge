import FakeDocumentRepository from '../repositories/fakes/FakeDocumentRepository'
import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeStorageProvider from '@shared/infra/container/providers/StorageProvider/fakes/FakeStorageProvider'

import CreateDocumentUseCases from './CreateDocumentUseCases'

import AppError from '@shared/errors/AppError'

let fakeDocumentRepository: FakeDocumentRepository
let fakeContractRepository: FakeContractRepository
let fakeStorageProvider: FakeStorageProvider
let createDocumentUseCases: CreateDocumentUseCases

describe('CreateDocumentUseCases', () => {
  beforeEach(() => {
    fakeDocumentRepository = new FakeDocumentRepository()
    fakeContractRepository = new FakeContractRepository()
    fakeStorageProvider = new FakeStorageProvider()
    createDocumentUseCases = new CreateDocumentUseCases(
      fakeDocumentRepository,
      fakeContractRepository,
      fakeStorageProvider
    )
  })

  it('should be able to create document', async () => {
    const contract = await fakeContractRepository.create({
      user_id: 'e1648eca-adff-4a2c-babc-919bde269378',
      loan_amount: 125000
    })

    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    const documents = await createDocumentUseCases.execute(
      fileNames,
      contract.id
    )

    expect(documents).toHaveProperty('id')
  })

  it('should not be able to create document if the contract does not exist', async () => {
    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    await expect(
      createDocumentUseCases.execute(fileNames, 'wrong-contract_id')
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create document with state approved', async () => {
    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    const contract = await fakeContractRepository.create({
      user_id: 'e1648eca-adff-4a2c-babc-919bde269378',
      loan_amount: 125000
    })

    contract.state = 'approved'

    await fakeContractRepository.save(contract)

    await expect(
      createDocumentUseCases.execute(fileNames, contract.id)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create document with state rejected', async () => {
    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    const contract = await fakeContractRepository.create({
      user_id: 'e1648eca-adff-4a2c-babc-919bde269378',
      loan_amount: 125000
    })

    contract.state = 'rejected'

    await fakeContractRepository.save(contract)

    await expect(
      createDocumentUseCases.execute(fileNames, contract.id)
    ).rejects.toBeInstanceOf(AppError)
  })
})
