import { Router, IRouter } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

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
    this.routes.post(
      '/',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          cpf: Joi.string().required(),
          monthly_income: Joi.number().required(),
          date_of_birth: Joi.string().required(),
          marital_status: Joi.string().required(),
          address: Joi.string().required()
        })
      }),
      this.createUser.store
    )
    this.routes.put(
      '/update',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          cpf: Joi.string().required(),
          monthly_income: Joi.number().required(),
          date_of_birth: Joi.string().required(),
          marital_status: Joi.string().required(),
          address: Joi.string().required()
        })
      }),
      this.updateUser.update
    )
  }
}

export default new UserRoutes().routes
