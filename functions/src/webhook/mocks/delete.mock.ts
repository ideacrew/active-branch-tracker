import { DeleteEventPayload } from '../delete/interfaces';
import { BaseDetails, mockBaseWebhookPayload } from './webhook.mock';

export const mockDeleteEventPayload = (
  branchName: string,
  baseDetails?: BaseDetails,
): DeleteEventPayload => {
  return {
    ref: branchName,
    ref_type: 'branch',
    pusher_type: 'user',
    ...mockBaseWebhookPayload(baseDetails),
  };
};
