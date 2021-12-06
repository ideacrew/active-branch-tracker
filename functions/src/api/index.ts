import express from 'express';
import * as functions from 'firebase-functions';

import { serviceDeployment, testRoute } from './controllers';

const apiPrefix = 'api';
export const app = express();

app.use(express.json());

app.use((req, res, next) => {
  functions.logger.info('Request:', req.body);

  if (req.url.indexOf(`/${apiPrefix}/`) === 0) {
    req.url = req.url.substring(apiPrefix.length + 1);
  }

  next();
});

app.get('/test-route', testRoute);

app.post('/service-deployment', serviceDeployment);
