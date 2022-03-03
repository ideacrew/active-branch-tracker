/* eslint-disable unicorn/no-null */
import { BaseDetails, mockBaseWebhookPayload } from './webhook.mock';
import { CreateEventPayload } from '../create/interfaces';

export const mockCreateDefaultBranchPayload = (
  branchName: string,
  baseDetails?: BaseDetails,
): CreateEventPayload => {
  return {
    ref: branchName,
    ref_type: 'branch',
    master_branch: branchName,
    description: null,
    pusher_type: 'user',
    ...mockBaseWebhookPayload(baseDetails),
  };
};

export const mockCreateFeatureBranchPayload = (
  branchName: string,
  baseDetails?: BaseDetails,
): CreateEventPayload => {
  return {
    ref: branchName,
    ref_type: 'branch',
    master_branch: 'trunk',
    description: null,
    pusher_type: 'user',
    ...mockBaseWebhookPayload(baseDetails),
  };
};
