export interface IFilenames {
  personal_document: string
  proof_of_income: string
  immobile: string
}

export default interface IStorageProvider {
  saveFiles: (filenames: IFilenames) => Promise<void>
  deleteFile: (filenames: IFilenames) => Promise<void>
}
