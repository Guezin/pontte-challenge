import { Router, IRouter } from 'express'

import ListContractsController from '@modules/contract/useCases/Contract/ListContractsController'
import CreateContractController from '@modules/contract/useCases/Contract/CreateContractController'

class ContractRoutes {
  public readonly routes: IRouter
  private listContracts: ListContractsController
  private createContract: CreateContractController

  constructor() {
    this.routes = Router()
    this.listContracts = new ListContractsController()
    this.createContract = new CreateContractController()

    this.init()
  }

  private init() {
    this.routes.get('/', this.listContracts.index)
    this.routes.post('/', this.createContract.store)
  }
}

export default new ContractRoutes().routes
