/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { createSafeBranchName } from '../../safe-branch-name';
import { DeleteEventPayload } from './interfaces';

/**
 * Handles the delete event from GitHub Actions
 * @param {DeleteEventPayload} payload
 * @return {Promise<void>} promise
 */
export async function handleDeleteEvent(
  payload: DeleteEventPayload,
): Promise<void> {
  const { ref: branchName, repository, organization } = payload;

  const safeBranchName = createSafeBranchName(branchName);

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const branchReference = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branch = await branchReference.get();

  if (branch.exists) {
    try {
      await branchReference.delete();
    } catch (error) {
      functions.logger.error(error);
    }
  }

  return;
}
