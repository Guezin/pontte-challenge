import Contract from '@modules/contracts/infra/typeorm/entities/Contract'

import ICreateContractDTO from '@modules/contracts/useCases/ICreateContractDTO'

export interface ISaveDocuments {
  document_id: string
  contract_id: string
}

export default interface IContractRepository {
  listContracts: () => Promise<Contract[]>
  create: (contractData: ICreateContractDTO) => Promise<Contract>
  findById: (contract_id: string) => Promise<Contract | undefined>
  saveDocuments: (documentsData: ISaveDocuments) => Promise<void>
}
