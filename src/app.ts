import 'reflect-metadata';

import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';

import AppError from '@errors/AppError';

import 'express-async-errors';

import './container';
import CrateConnection from './database/typeorm';
import routes from './routes';
import 'moment/locale/pt-br';
import swaggerFile from './swagger.json';
// import './database/typeorm';

// import 'dotenv/config';
// console.log('process.env', process.env);

CrateConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);
app.use(errors());
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // console.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error!',
    });
  },
);

export default app;
