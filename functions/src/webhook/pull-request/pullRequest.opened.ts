import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { firestoreTimestamp } from '../../util';
import { PullRequestEventPayload } from './interfaces/pullRequest';
import { PullRequestDocument } from './interfaces/pullRequestDocument';

export const handleOpenedPullRequest = async (
  payload: PullRequestEventPayload,
): Promise<void> => {
  const { pull_request: pullRequest, repository, organization } = payload;
  const { login: organizationName } = organization;
  const { number: pullRequestNumber, head, base } = pullRequest;
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
  };

  try {
    await admin
      .firestore()
      // where are we saving this document?
      .collection('pullRequests')
      .doc(
        `${organizationName}-${repositoryName}-${head.ref}-${pullRequestNumber}`,
      )
      .set(pullRequestDocument);
  } catch (e) {
    functions.logger.error(e);
  }
};
