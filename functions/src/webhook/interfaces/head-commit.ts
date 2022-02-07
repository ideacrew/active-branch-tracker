/* eslint-disable camelcase */

export interface Commit {
  id: string;
  message: string;
  url?: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
  };
}
