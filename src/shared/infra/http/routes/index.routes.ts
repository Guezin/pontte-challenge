import { Router, IRouter } from 'express'

import UserRoutes from '@modules/users/infra/http/routes/user.routes'
import ContractRoutes from '@modules/contracts/infra/http/routes/contract.routes'
import DocumentRoutes from '@modules/documents/infra/http/routes/document.routes'

class Routes {
  public readonly routes: IRouter

  constructor() {
    this.routes = Router()

    this.init()
  }

  public init() {
    this.routes.use('/users', UserRoutes)
    this.routes.use('/contracts', ContractRoutes)
    this.routes.use('/documents', DocumentRoutes)
  }
}

export default new Routes().routes
