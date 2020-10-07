import { Router, IRouter } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

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
    this.routes.post(
      '/',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          user_id: Joi.string().uuid().required(),
          loan_amount: Joi.number().required()
        })
      }),
      this.createContract.store
    )
    this.routes.put(
      '/update',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          contract_id: Joi.string().uuid().required(),
          loan_amount: Joi.number().required()
        })
      }),
      this.updateContract.update
    )

    this.routes.patch(
      '/approved',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          contract_id: Joi.string().uuid().required()
        })
      }),
      this.approvedContract.store
    )
    this.routes.patch(
      '/rejected',
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          contract_id: Joi.string().uuid().required()
        })
      }),
      this.rejectedContract.store
    )
  }
}

export default new ContractRoutes().routes
