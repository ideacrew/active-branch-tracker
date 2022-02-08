import { WebhookPayload } from '../interfaces';
import { mockOrganization } from './organization.mock';
import { mockRepository } from './repository.mock';
import { mockSender } from './sender.mock';

export const mockBaseWebhookPayload: WebhookPayload = {
  sender: mockSender,
  organization: mockOrganization,
  repository: mockRepository,
};
