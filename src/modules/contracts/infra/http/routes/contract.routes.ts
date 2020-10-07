import { Router, IRouter } from 'express'

import ListContractController from '@modules/contracts/useCases/ListContractController'
import ListAllContractsController from '@modules/contracts/useCases/ListAllContractsController'
import CreateContractController from '@modules/contracts/useCases/CreateContractController'
import UpdateContractController from '@modules/contracts/useCases/UpdateContractController'
import ApprovedContractController from '@modules/contracts/useCases/ApprovedContractController'
import RejectedContractController from '@modules/contracts/useCases/RejectedContractController'

class ContractRoutes {
  public readonly routes: IRouter

  private listContract: ListContractController
  private listAllContracts: ListAllContractsController
  private createContract: CreateContractController
  private updateContract: UpdateContractController
  private approvedContract: ApprovedContractController
  private rejectedContract: RejectedContractController

  constructor() {
    this.routes = Router()
    this.listContract = new ListContractController()
    this.listAllContracts = new ListAllContractsController()
    this.createContract = new CreateContractController()
    this.updateContract = new UpdateContractController()
    this.approvedContract = new ApprovedContractController()
    this.rejectedContract = new RejectedContractController()

    this.init()
  }

  private init() {
    this.routes.get('/:contract_id', this.listContract.show)
    this.routes.get('/', this.listAllContracts.index)
    this.routes.post('/', this.createContract.store)
    this.routes.put('/update', this.updateContract.update)

    this.routes.patch('/approved', this.approvedContract.store)
    this.routes.patch('/rejected', this.rejectedContract.store)
  }
}

export default new ContractRoutes().routes
