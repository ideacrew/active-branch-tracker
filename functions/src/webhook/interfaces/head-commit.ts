/* eslint-disable camelcase */

export interface Commit {
  id: string;
  tree_id: string;
  message: string;
  distinct?: boolean;
  url?: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
    username?: string;
  };
  committer: {
    name: string;
    email: string;
    username?: string;
  };
  added?: string[];
  removed?: string[];
  modified?: string[];
}
