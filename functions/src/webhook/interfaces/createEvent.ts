/* eslint-disable camelcase */
import { WebhookPayload } from './basePayload';

export interface CreateEventPayload extends WebhookPayload {
  ref: string; // name of thing that got created
  ref_type: 'branch' | 'tag'; // type of thing that got created
  master_branch: string;
  description: unknown;
  pusher_type: 'user';
}
