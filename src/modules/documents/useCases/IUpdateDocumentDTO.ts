interface IFileNames {
  personal_document: string
  proof_of_income: string
  immobile: string
}

export default interface IUpdateDocumentDTO {
  fileNames: IFileNames
  document_id: string
}
