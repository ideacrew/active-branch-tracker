/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { createSafeBranchName } from '../safeBranchName';
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

  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branch = await branchRef.get();

  if (branch.exists) {
    try {
      await branchRef.delete();
    } catch (e) {
      functions.logger.error(e);
    }
  }

  return Promise.resolve();
}
