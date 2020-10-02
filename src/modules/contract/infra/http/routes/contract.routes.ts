import { Router, IRouter } from 'express'

import ListContractController from '@modules/contract/useCases/Contract/ListContractController'
import ListAllContractsController from '@modules/contract/useCases/Contract/ListAllContractsController'
import CreateContractController from '@modules/contract/useCases/Contract/CreateContractController'

class ContractRoutes {
  public readonly routes: IRouter
  private listContract: ListContractController
  private listAllContracts: ListAllContractsController
  private createContract: CreateContractController

  constructor() {
    this.routes = Router()
    this.listContract = new ListContractController()
    this.listAllContracts = new ListAllContractsController()
    this.createContract = new CreateContractController()

    this.init()
  }

  private init() {
    this.routes.get('/:contract_id', this.listContract.show)
    this.routes.get('/', this.listAllContracts.index)
    this.routes.post('/', this.createContract.store)
  }
}

export default new ContractRoutes().routes
