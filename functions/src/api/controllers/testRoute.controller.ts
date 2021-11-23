import { Request, Response } from 'express';

export const testRoute = async (req: Request, res: Response): Promise<void> => {
  res.status(200).send('Hello from Express.js');
};
