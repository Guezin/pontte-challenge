import { Router, IRouter } from 'express'

import CreateUserController from '@modules/users/useCases/CreateUserController'

class UserRoutes {
  public readonly routes: IRouter
  private createUser: CreateUserController

  constructor() {
    this.routes = Router()
    this.createUser = new CreateUserController()

    this.init()
  }

  private init() {
    this.routes.post('/', this.createUser.store)
  }
}

export default new UserRoutes().routes
