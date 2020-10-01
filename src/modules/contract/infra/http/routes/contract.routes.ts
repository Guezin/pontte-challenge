import { Router, IRouter } from 'express'

import ListContractsController from '@modules/contract/useCases/Contract/ListContractsController'

class ContractRoutes {
  public readonly routes: IRouter
  private listContracts: ListContractsController

  constructor() {
    this.routes = Router()
    this.listContracts = new ListContractsController()

    this.init()
  }

  public init() {
    this.routes.get('/', this.listContracts.index)
  }
}

export default new ContractRoutes().routes
