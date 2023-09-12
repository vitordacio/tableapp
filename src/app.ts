import 'reflect-metadata';
import http from 'http';
import 'dotenv/config';
import express, { json, Request } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { LoggerStream } from '@config/winston';
import '@config/container';

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { router } from './routes';

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

morgan.token('body', (req: Request) => JSON.stringify(req.body));

morgan.token('user', (req: Request) => JSON.stringify(req.user));

app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - "body": ':body' - ":referrer" "user: ':user' ":user-agent"`,
    {
      skip: (req, res) => res.statusCode >= 400,
      stream: new LoggerStream(),
    },
  ),
);

app.use(json());

app.use(router);

app.use('/public', express.static(`${__dirname}/public/uploads`));
app.use('/files', express.static(`${__dirname}/public/files`));

app.use(globalErrorHandler);

const server = http.createServer(app);

export { server };
