import { container } from 'tsyringe'

import IMailTemplateProvider from './models/IMailTemplateProvider'
import HandlebarsMailTemplate from './implementations/HandlebarsMailTemplate'

container.registerSingleton<IMailTemplateProvider>(
  'HandlebarsMailTemplate',
  HandlebarsMailTemplate
)
