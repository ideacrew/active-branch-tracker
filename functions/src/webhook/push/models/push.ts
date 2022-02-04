import { Commit, WebhookPayload } from '../../interfaces';

export interface PushEventPayload extends WebhookPayload {
  ref: string; // branch name plus /refs/heads/ or /refs/tags/
  before: string; // prior commit sha
  after: string; // commit sha after push
  pusher: {
    // person that pushed the commit
    name: string; // GitHub username
    email: string; // GitHub email
  };
  created: boolean; // true if the ref was created with this commit
  deleted: boolean; // true if the ref was deleted with this commit
  forced: boolean; // true if the push was forced
  base_ref: unknown; // not sure what this is
  compare: string;
  commits: Commit[];
  head_commit: Commit;
}
