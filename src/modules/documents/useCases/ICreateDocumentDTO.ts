export interface IFileNames {
  personal_document: string
  proof_of_income: string
  immobile: string
}

export default interface ICreateDocumentDTO {
  fileNames: IFileNames
  contract_id: string
}
