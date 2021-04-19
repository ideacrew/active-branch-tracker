import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { PullRequestEventPayload } from './interfaces/pullRequest';
import { PullRequestDocument } from './interfaces/pullRequestDocument';

export const handleOpenedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  const { pull_request: pullRequest, repository, organization } = payload;
  const { login: organizationName } = organization;
  const { number: pullRequestNumber, head, base } = pullRequest;
  const { name: repositoryName } = repository;

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

    createdAt: pullRequest.created_at,
    updatedAt: pullRequest.updated_at,
  };

  try {
    await admin
      .firestore()
      .collection(`branches`)
      .doc(`${organizationName}-${repositoryName}-${branchName}`)
      .update({ pullRequestNumber });
  } catch (e) {
    functions.logger.error(e);
  }
};
