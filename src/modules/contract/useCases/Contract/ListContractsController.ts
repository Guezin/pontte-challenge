import { Request, Response } from 'express'

class ListContractsController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true })
  }
}

export default ListContractsController
