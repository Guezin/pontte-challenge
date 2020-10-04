import { container } from 'tsyringe'

import IStorageProvider from './models/IStorageProvider'
import StorageProvider from './implementations/StorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider
)
