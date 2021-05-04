import { firestoreTimestamp } from '../../../util';
import { PullRequestDocument } from '../interfaces/pullRequestDocument';
import { PullRequestEventPayload } from '../interfaces/pullRequestPayload';

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
  } = pullRequest;
  const { name: repositoryName } = repository;

  const createdAt = firestoreTimestamp(pullRequest.created_at);
  const updatedAt = firestoreTimestamp(pullRequest.updated_at);

  const pullRequestDocument: PullRequestDocument = {
    additions: pullRequest.additions,
    branchName: head.ref,
    changedFiles: pullRequest.changed_files,
    commits: pullRequest.commits,
    deletions: pullRequest.deletions,
    number: pullRequestNumber,
    organizationName,
    repositoryName,
    targetBranchName: base.ref,
    createdAt,
    updatedAt,
    userName: pullRequest.user.login,
    merged,
    draft,
    closed: closedAt === null ? false : true,
  };

  return pullRequestDocument;
};
