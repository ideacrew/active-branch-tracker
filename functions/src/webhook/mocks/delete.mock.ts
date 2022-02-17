import { DeleteEventPayload } from '../delete/interfaces';
import { mockBaseWebhookPayload } from './webhook.mock';

export const mockDeleteEventPayload = (
  branchName: string,
): DeleteEventPayload => {
  return {
    ref: branchName,
    ref_type: 'branch',
    pusher_type: 'user',
    ...mockBaseWebhookPayload,
  };
};
