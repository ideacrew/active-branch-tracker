import { DeletePayload } from '../delete/interfaces';
import { BaseDetails, mockBaseWebhookPayload } from './webhook.mock';

export const mockDeleteEventPayload = (
  branchName: string,
  baseDetails?: BaseDetails,
): DeletePayload => {
  return {
    ref: branchName,
    ref_type: 'branch',
    pusher_type: 'user',
    ...mockBaseWebhookPayload(baseDetails),
  };
};
