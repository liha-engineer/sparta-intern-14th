import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import accountsRouter from './routes/accounts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', [accountsRouter]);

app.listen(config.server.port, config.server.host, () => {
  console.log(`Sever running is on ${config.server.host}:${config.server.port}`);
});
