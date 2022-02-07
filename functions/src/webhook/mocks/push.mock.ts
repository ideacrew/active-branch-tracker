/* eslint-disable unicorn/no-null */
import { PushEventPayload } from '../push';
import { faker } from '@faker-js/faker';
import { mockWebhookPayload } from './webhook.mock';
import { Commit } from '../interfaces';

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

// This represents a commit pushed to a feature branch
export const mockPushEventPayload: PushEventPayload = {
  ref: 'refs/heads/feature-branch',
  before: faker.git.commitSha(),
  after: afterCommitSha,
  pusher: person,
  created: false,
  deleted: false,
  forced: false,
  commits: [afterCommit],
  head_commit: afterCommit,
  ...mockWebhookPayload,
};
