import fs from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/multer'

import IStorageProvider, { IFilenames } from '../models/IStorageProvider'

class StorageProvider implements IStorageProvider {
  public async saveFiles({
    personal_document,
    proof_of_income,
    immobile
  }: IFilenames): Promise<void> {
    const files = [personal_document, proof_of_income, immobile]

    files.forEach(async file => {
      await fs.promises.rename(
        resolve(uploadConfig.directory, file),
        resolve(uploadConfig.uploadsFolder, file)
      )
    })
  }

  public async deleteFile({
    personal_document,
    proof_of_income,
    immobile
  }: IFilenames): Promise<void> {
    const files = [personal_document, proof_of_income, immobile]

    try {
      files.forEach(async file => {
        await fs.promises.stat(resolve(uploadConfig.uploadsFolder, file))
      })
    } catch {
      return
    }

    files.forEach(async file => {
      await fs.promises.unlink(resolve(uploadConfig.uploadsFolder, file))
    })
  }
}

export default StorageProvider
