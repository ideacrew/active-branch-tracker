/* eslint-disable camelcase */
import { Assignee } from '../../interfaces/assignee';
import { WebhookPayload } from '../../interfaces/basePayload';
import { GitHubUser } from '../../interfaces/githubUser';
import { Label } from '../../interfaces/label';

export type IssueCommentAction = 'created' | 'edited' | 'deleted';

export interface IssueCommentPayload extends WebhookPayload {
  action: IssueCommentAction;
  // Only appears on edited comments
  changes?: {
    body: {
      from: string;
    };
  };
  issue: Issue;
  comment: Comment;
}

interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number; // Number of the Issue (Pull Request)
  title: string; // Title of the Issue (Pull Request)
  user: GitHubUser;
  labels: Label[];
  state: 'open' | 'closed';
  locked: boolean;
  assignee: Assignee | null;
  assignees: Assignee[];
  milestone: unknown;
  comments: number; // Total number of comments
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: unknown;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
  body: string;
  performed_via_github_app: unknown;
}

interface Comment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string; // The actual comment
  performed_via_github_app: unknown;
}
