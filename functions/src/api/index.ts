import express from 'express';

import { testRoute } from './controllers/testRoute.controller';

export const app = express();

app.get('/test-route', testRoute);
