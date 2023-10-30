import 'reflect-metadata'
import 'express-async-error'
import express, { NextFunction, Request, Response, json } from 'express'
import { errors } from 'celebrate'
import cors from 'cors'
import routerSetup from './routes'
import AppError from '@shared/errors/app_error'

const app = express()
app.use(cors())
app.use(json())

routerSetup(app)

app.use(errors()) // para capturar dos error na requisição

// Middleware para captura de error
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'error', message: 'Internal Server Error' })
})

export default app
