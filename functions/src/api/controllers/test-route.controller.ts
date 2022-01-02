import { Request, Response } from 'express';

export const testRoute = async (
  request: Request,
  response: Response,
): Promise<void> => {
  response.status(200).send('Hello from Express.js');
};
