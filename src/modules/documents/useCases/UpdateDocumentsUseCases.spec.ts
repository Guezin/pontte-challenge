import FakeDocumentRepository from '../repositories/fakes/FakeDocumentRepository'
import FakeContractRepository from '@modules/contracts/repositories/fakes/FakeContractRepository'
import FakeStorageProvider from '@shared/infra/container/providers/StorageProvider/fakes/FakeStorageProvider'

import UpdateDocumentsUseCases from './UpdateDocumentsUseCases'

import AppError from '@shared/errors/AppError'

let fakeDocumentRepository: FakeDocumentRepository
let fakeContractRepository: FakeContractRepository
let fakeStorageProvider: FakeStorageProvider
let updateDocumentUseCases: UpdateDocumentsUseCases

describe('UpdateDocumentsUseCases', () => {
  beforeEach(() => {
    fakeDocumentRepository = new FakeDocumentRepository()
    fakeContractRepository = new FakeContractRepository()
    fakeStorageProvider = new FakeStorageProvider()
    updateDocumentUseCases = new UpdateDocumentsUseCases(
      fakeDocumentRepository,
      fakeContractRepository,
      fakeStorageProvider
    )
  })

  it('should be able to update document', async () => {
    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    const contract = await fakeContractRepository.create({
      user_id: 'e1648eca-adff-4a2c-babc-919bde269378',
      loan_amount: 125000
    })

    const documents = await fakeDocumentRepository.create({
      fileNames,
      contract_id: contract.id
    })

    const updatedFileNames = {
      personal_document: 'newMyDocumentCpfOrCnh.png',
      proof_of_income: 'newProofIncome.png',
      immobile: 'newImmobile.png'
    }

    const updatedDocuments = await updateDocumentUseCases.execute(
      updatedFileNames,
      documents.id
    )

    expect(updatedDocuments.personal_document).toEqual(
      'newMyDocumentCpfOrCnh.png'
    )
    expect(updatedDocuments.proof_of_income).toEqual('newProofIncome.png')
    expect(updatedDocuments.immobile).toEqual('newImmobile.png')
  })

  it('should not be able to update document if the document does not exist', async () => {
    const fileNames = {
      personal_document: 'myDocumentCpfOrCnh.png',
      proof_of_income: 'proofIncome.png',
      immobile: 'immobile.png'
    }

    await expect(
      updateDocumentUseCases.execute(fileNames, 'wrong-document_id')
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update document if the contract is state approved', async () => {
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

    const documents = await fakeDocumentRepository.create({
      fileNames,
      contract_id: contract.id
    })

    await expect(
      updateDocumentUseCases.execute(fileNames, documents.id)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update document if the contract is state rejected', async () => {
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

    const documents = await fakeDocumentRepository.create({
      fileNames,
      contract_id: contract.id
    })

    await expect(
      updateDocumentUseCases.execute(fileNames, documents.id)
    ).rejects.toBeInstanceOf(AppError)
  })
})
