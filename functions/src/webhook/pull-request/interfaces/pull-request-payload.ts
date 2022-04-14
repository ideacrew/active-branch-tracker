import { WebhookPayload } from '../../interfaces';
import { PullRequest } from './pull-request';
import { PullRequestAction } from './pull-request-action';

export interface PullRequestPayload extends WebhookPayload {
  action: PullRequestAction;
  number: number;
  pull_request: PullRequest;
  changes?: unknown;
}
