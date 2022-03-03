import { WebhookPayload } from '../interfaces';

export interface BaseDetails {
  sender?: string;
  organization?: string;
  repository?: string;
}

export const mockBaseWebhookPayload = ({
  sender = 'mockUser',
  organization = 'mock-organization',
  repository = 'mock-repository',
}: BaseDetails = {}): WebhookPayload => {
  return {
    sender: {
      login: sender,
    },
    organization: {
      login: organization,
    },
    repository: {
      name: repository,
    },
  };
};
