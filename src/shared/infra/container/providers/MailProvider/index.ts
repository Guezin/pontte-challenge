import { container } from 'tsyringe'

import IMailProvider from './models/IMailProvider'
import EtherealMail from './implementations/EtherealMail'

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMail)
)
