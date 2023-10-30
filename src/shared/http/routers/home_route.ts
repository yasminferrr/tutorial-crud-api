import { Request, Response, Router } from 'express'

export default (router: Router): void => {
  router.get('/', (request: Request, response: Response) => response.json({ message: 'Hello World' }))
}
