/* eslint-disable unicorn/no-null */
import { PushEventPayload } from '../push';
import { faker } from '@faker-js/faker';
import { mockBaseWebhookPayload } from './webhook.mock';
import { Commit } from '../interfaces';

// This represents a commit pushed to a feature branch
export const mockPushEventPayload = (
  branchName = 'feature-branch',
): PushEventPayload => {
  const afterCommitSha = faker.git.commitSha();
  const person = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
  };
  const timestamp = new Date().toISOString();

  const afterCommit: Commit = {
    id: afterCommitSha,
    message: faker.git.commitMessage(),
    timestamp,
    author: person,
  };

  return {
    ref: `refs/heads/${branchName}`,
    before: faker.git.commitSha(),
    after: afterCommitSha,
    pusher: person,
    created: false,
    deleted: false,
    forced: false,
    commits: [afterCommit],
    head_commit: afterCommit,
    ...mockBaseWebhookPayload,
  };
};
