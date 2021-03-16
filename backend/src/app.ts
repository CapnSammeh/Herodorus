/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { Application, Request, Response } from 'express';

import morgan from 'morgan';
import helmet from 'helmet';


//import knexfile from '../knexfile';
const app: Application = express();
const port = process.env.PORT || 3000;

// Empty Promise to mock connection to a DB
const data = Promise.resolve()

Promise.resolve(data).then(() => {
  app.disable('etag');
  app
    .use(helmet())
    .use(morgan('dev'))

  app
    .get('/test', (_req: Request, res: Response) => (res.send()))
    .listen(port, () => console.log(`server is listening on http://localhost:${port}`))

})
