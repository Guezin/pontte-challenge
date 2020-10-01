import { Router, IRouter } from 'express'

import ContractRoutes from '@modules/contract/infra/http/routes/contract.routes'

class Routes {
  public readonly routes: IRouter

  constructor() {
    this.routes = Router()

    this.init()
  }

  public init() {
    this.routes.use('/contract', ContractRoutes)
  }
}

export default new Routes().routes
