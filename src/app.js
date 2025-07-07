import express from 'express';
import { config } from './config/config.js';

const app = express();

app.listen(config.server.port, config.server.host, () => {
  console.log(
        `Sever running is on ${config.server.host}:${config.server.port}`,
      );
});