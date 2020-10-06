import { inject, injectable } from 'tsyringe'
import { resolve } from 'path'

import AppError from '@shared/errors/AppError'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'
import IContractRepository from '@modules/contracts/repositories/IContractRepository'
import IMailProvider from '@shared/infra/container/providers/MailProvider/models/IMailProvider'

@injectable()
class RejectedContractUseCases {
  constructor(
    @inject('ContractRepository')
    private contractRepository: IContractRepository,

    @inject('MailProvider')
    private etherealMail: IMailProvider
  ) {}

  public async execute(contract_id: string): Promise<Contract> {
    const contract = await this.contractRepository.findById(contract_id)

    if (!contract) {
      throw new AppError('Sorry, contract not found!')
    }

    if (contract.state === 'approved') {
      throw new AppError('Unable to update, contract in approved status', 401)
    } else if (contract.state === 'rejected') {
      throw new AppError('Unable to update, contract in rejected status', 401)
    }

    contract.state = 'rejected'

    await this.contractRepository.save(contract)

    const rejectedContractTemplate = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'rejected_contract.hbs'
    )

    await this.etherealMail.sendMail({
      to: {
        name: contract.user.name,
        email: contract.user.email
      },
      subject: 'Empréstimo Reprovado',
      templateData: {
        file: rejectedContractTemplate,
        variables: {
          name: contract.user.name
        }
      }
    })

    return contract
  }
}

export default RejectedContractUseCases
