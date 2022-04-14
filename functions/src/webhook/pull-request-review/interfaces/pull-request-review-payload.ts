import { WebhookPayload } from '../../interfaces';
import { PullRequest } from '../../pull-request/interfaces/pull-request';

export interface PullRequestReviewPayload extends WebhookPayload {
  action: 'submitted' | 'edited' | 'dismissed';
  review: {
    user: {
      login: string; // mdkaraman
    };
    submitted_at: string; // 2022-04-14T14:26:26Z
    body: string;
    state: 'approved' | 'commented';
    html_url: string; // link to review
  };
  pull_request: PullRequest;
}
