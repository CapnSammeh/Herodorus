//Import Environment Vars
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

//Import Express
import express from 'express';
import { Application, Request, Response } from 'express';
const app: Application = express();

//Import Middleware
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';


// Empty Promise to mock connection to a DB
//TODO Connect to the actual DB
const data = Promise.resolve()

//Begin Processing 
Promise.resolve(data).then(() => {
  app.disable('etag');
  app
    .use(helmet())
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  app
    .get('/test', (_req: Request, res: Response) => (res.send()))
    .listen(port, () => console.log(`server is listening on http://localhost:${port}`))

})
