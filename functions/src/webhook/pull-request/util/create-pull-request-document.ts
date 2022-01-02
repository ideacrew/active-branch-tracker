/* eslint-disable camelcase */
import { firestoreTimestamp } from '../../../util';
import { PullRequestDocument } from '../interfaces/pull-request-document';
import { PullRequestEventPayload } from '../interfaces/pull-request-payload';

export const createPullRequestDocument = (
  payload: PullRequestEventPayload,
): PullRequestDocument => {
  const { pull_request: pullRequest, repository, organization } = payload;
  const { login: organizationName } = organization;
  const {
    number: pullRequestNumber,
    head,
    base,
    merged,
    draft,
    closed_at: closedAt,
    additions,
    created_at,
    updated_at,
    changed_files,
    commits,
    deletions,
    user,
  } = pullRequest;
  const { name: repositoryName } = repository;

  const createdAt = firestoreTimestamp(created_at);
  const updatedAt = firestoreTimestamp(updated_at);

  const pullRequestDocument: PullRequestDocument = {
    additions: additions,
    branchName: head.ref,
    changedFiles: changed_files,
    commits: commits,
    deletions: deletions,
    number: pullRequestNumber,
    organizationName,
    repositoryName,
    targetBranchName: base.ref,
    createdAt,
    updatedAt,
    userName: user.login,
    merged,
    draft,
    closed: closedAt === null ? false : true,
  };

  return pullRequestDocument;
};
