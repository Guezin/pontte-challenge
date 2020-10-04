import { Router, IRouter } from 'express'

import CreateUserController from '@modules/users/useCases/CreateUserController'
import UpdateUserController from '@modules/users/useCases/UpdateUserController'

class UserRoutes {
  public readonly routes: IRouter

  private createUser: CreateUserController
  private updateUser: UpdateUserController

  constructor() {
    this.routes = Router()
    this.createUser = new CreateUserController()
    this.updateUser = new UpdateUserController()

    this.init()
  }

  private init() {
    this.routes.post('/', this.createUser.store)
    this.routes.put('/update', this.updateUser.update)
  }
}

export default new UserRoutes().routes
