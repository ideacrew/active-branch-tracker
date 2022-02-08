import { DeleteEventPayload } from '../delete/interfaces';
import { mockBaseWebhookPayload } from './webhook.mock';

export const mockDeleteEventPayload: DeleteEventPayload = {
  ref: `feature-branch`,
  ref_type: 'branch',
  pusher_type: 'user',
  ...mockBaseWebhookPayload,
};
