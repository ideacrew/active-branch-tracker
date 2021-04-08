import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface WebhookPayload {
  sender: Sender;
  organization: Organization;
  repository: Repository;
}
