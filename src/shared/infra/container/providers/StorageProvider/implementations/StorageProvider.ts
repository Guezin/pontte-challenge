import fs from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/multer'

import IStorageProvider, { IFilenames } from '../models/IStorageProvider'

class StorageProvider implements IStorageProvider {
  public async saveFiles(filenames: IFilenames): Promise<void> {
    await fs.promises.rename(
      resolve(uploadConfig.directory, filenames.personal_document),
      resolve(uploadConfig.uploadsFolder, filenames.personal_document)
    )

    await fs.promises.rename(
      resolve(uploadConfig.directory, filenames.proof_of_income),
      resolve(uploadConfig.uploadsFolder, filenames.proof_of_income)
    )

    await fs.promises.rename(
      resolve(uploadConfig.directory, filenames.immobile),
      resolve(uploadConfig.uploadsFolder, filenames.immobile)
    )
  }

  public async deleteFile(filenames: IFilenames): Promise<void> {
    const filePathPersonalDocument = resolve(
      uploadConfig.uploadsFolder,
      filenames.personal_document
    )
    const filePathProofOfIncome = resolve(
      uploadConfig.uploadsFolder,
      filenames.proof_of_income
    )
    const filePathImmobile = resolve(
      uploadConfig.uploadsFolder,
      filenames.immobile
    )

    try {
      await fs.promises.stat(filePathPersonalDocument)
      await fs.promises.stat(filePathProofOfIncome)
      await fs.promises.stat(filePathImmobile)
    } catch {
      return
    }

    await fs.promises.unlink(filePathPersonalDocument)
    await fs.promises.unlink(filePathProofOfIncome)
    await fs.promises.unlink(filePathImmobile)
  }
}

export default StorageProvider
