/* eslint-disable camelcase */
import { Owner } from './owner';

export interface App {
  id: number;
  slug: string;
  node_id: string;
  owner: Owner;
  name: string;
  description: string;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: { [permissionName: string]: string };
  events: string[];
}
