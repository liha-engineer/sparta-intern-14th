import express from 'express';
import cookieParser from 'cookie-parser';
import YAML from 'yamljs';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./utils/swagger/swagger-output.json" with { type : "json" };
import path from 'path';
import { config } from './config/config.js';
import accountsRouter from './routes/accounts.router.js';

const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', [accountsRouter]);

app.listen(config.server.port, config.server.host, () => {
  console.log(`Sever running is on ${config.server.host}:${config.server.port}`);
});
