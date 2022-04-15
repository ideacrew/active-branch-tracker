/* eslint-disable camelcase */

import { WebhookPayload } from '../../interfaces';

export interface DeletePayload extends WebhookPayload {
  ref: string; // branch name
  ref_type: 'branch' | 'tag'; // type of thing that got deleted
  pusher_type: string;
}
