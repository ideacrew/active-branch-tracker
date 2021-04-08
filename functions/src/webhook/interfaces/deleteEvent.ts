/* eslint-disable camelcase */
import { WebhookPayload } from './basePayload';

export interface DeleteEventPayload extends WebhookPayload {
  ref: string; // branch name
  ref_type: 'branch' | 'tag'; // type of thing that got deleted
  pusher_type: string;
}
