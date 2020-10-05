import { cpf as cpfValidator } from 'cpf-cnpj-validator'

export default (cpf: string): boolean => {
  const cpfIsValid = cpfValidator.isValid(cpf)

  return cpfIsValid
}
