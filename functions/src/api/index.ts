import express from 'express';
import * as functions from 'firebase-functions';

import { testRoute } from './controllers';

const apiPrefix = 'api';
export const app = express();

app.use((req, res, next) => {
  if (req.url.indexOf(`/${apiPrefix}/`) === 0) {
    functions.logger.log('Request url', req.url);
    req.url = req.url.substring(apiPrefix.length + 1);
    functions.logger.log('New request url', req.url);
  }

  next();
});

app.get('/test-route', testRoute);
