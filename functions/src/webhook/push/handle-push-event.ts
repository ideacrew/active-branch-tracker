/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { createSafeBranchName } from '../../safe-branch-name';
import { PushEventPayload } from './models';

export const handlePushEvent = async (
  payload: PushEventPayload,
): Promise<void> => {
  const { created, deleted } = payload;

  // If this push event is creating or deleting something we can ignore it
  if (created || deleted) {
    return;
  }

  const { ref, head_commit, repository, organization } = payload;

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const unsafeBranchName = ref.split('/').slice(-1)[0] ?? 'unknown';
  const safeBranchName = createSafeBranchName(unsafeBranchName);

  const branchReference = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branchDocumentSnapshot = await branchReference.get();

  if (branchDocumentSnapshot.exists) {
    const timestamp = new Date(head_commit.timestamp).getTime();

    try {
      await branchReference.set(
        {
          head_commit,
          timestamp,
        },
        { merge: true },
      );
    } catch (error) {
      functions.logger.error('Could not save workflow run to branch', {
        branch: safeBranchName,
        error: error,
      });
      return;
    }
  } else {
    return;
  }
};
