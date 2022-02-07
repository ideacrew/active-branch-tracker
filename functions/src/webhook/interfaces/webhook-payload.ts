import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

// These properties will appear on every payload.
// The interfaces have been scoped to define only what
// is needed for consumption in
export interface WebhookPayload {
  sender: Sender;
  organization: Organization;
  repository: Repository;
}
