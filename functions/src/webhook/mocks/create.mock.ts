/* eslint-disable unicorn/no-null */
import { mockWebhookPayload } from './webhook.mock';
import { CreateEventPayload } from '../create/interfaces';

export const mockCreateDefaultBranchPayload: CreateEventPayload = {
  ref: `trunk`,
  ref_type: 'branch',
  master_branch: 'trunk',
  description: null,
  pusher_type: 'user',
  ...mockWebhookPayload,
};

export const mockCreateFeatureBranchPayload: CreateEventPayload = {
  ref: 'feature-branch',
  ref_type: 'branch',
  master_branch: 'trunk',
  description: null,
  pusher_type: 'user',
  ...mockWebhookPayload,
};
