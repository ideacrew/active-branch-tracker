import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const databaseScript = async (): Promise<
  [boolean, string | undefined]
> => {
  return [true, undefined];
};
