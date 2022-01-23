import express from 'express';
import * as functions from 'firebase-functions';

import { serviceDeployment, dataRefresh, testRoute } from './controllers';

const apiPrefix = 'api';
export const app = express();

app.use(express.json());

app.use((request, _response, next) => {
  functions.logger.info('Request:', request.body);

  if (request.url.indexOf(`/${apiPrefix}/`) === 0) {
    request.url = request.url.slice(Math.max(0, apiPrefix.length + 1));
  }

  next();
});

app.get('/test-route', testRoute);

app.post('/service-deployment', serviceDeployment);
app.post('/data-refresh', dataRefresh);
