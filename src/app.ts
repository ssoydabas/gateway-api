import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from '@/routes';
import httpStatus from 'http-status';
import { errorHandler } from '@/middlewares/error';
import { CustomError } from '@/errors/customError';
import { contextMiddleware } from '@/middlewares/context';

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// enable context
app.use(contextMiddleware);

app.get('/health-check', (_, res) => {
  res.status(httpStatus.OK).send();
});

app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((_, __, next) => {
  console.log('404');
  console.log('The endpoint is not found');
  next(
    new CustomError(httpStatus.NOT_FOUND, 'RESOURCE_NOT_FOUND', 'Not found'),
  );
});

// handle error
app.use(errorHandler);

export default app;
