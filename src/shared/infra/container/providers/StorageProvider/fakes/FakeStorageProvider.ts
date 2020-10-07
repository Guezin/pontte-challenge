import IStorageProvider, { IFilenames } from '../models/IStorageProvider'

class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = []

  constructor() {
    this.storage = []
  }

  public async saveFiles({
    personal_document,
    proof_of_income,
    immobile
  }: IFilenames): Promise<void> {
    this.storage.push(personal_document, proof_of_income, immobile)
  }

  public async deleteFile({
    personal_document,
    proof_of_income,
    immobile
  }: IFilenames): Promise<void> {
    const files = [personal_document, proof_of_income, immobile]

    this.storage.forEach((file, position) => {
      if (file === files[position]) {
        this.storage.splice(position, 1)
      }
    })
  }
}

export default DiskStorageProvider
