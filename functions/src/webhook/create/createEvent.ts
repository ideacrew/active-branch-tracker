/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { BranchInfo } from '../../models/branchInfo';
import { createSafeBranchName } from '../../safeBranchName';
import { firestoreTimestamp } from '../../util';
import { getRealName } from '../../util/getRealName';
import { CreateEventPayload } from './interfaces/createEvent';

/**
 * Handles a create event from GitHub Actions
 * @param {CreateEventPayload} payload
 * @return {Promise<void>} promise
 */
export async function handleCreateEvent(
  payload: CreateEventPayload,
): Promise<void> {
  const { ref: branchName, repository, organization, sender } = payload;

  const safeBranchName = createSafeBranchName(branchName);

  const { login: createdBy } = sender;
  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branchInfo: BranchInfo = {
    repositoryName,
    organizationName,
    branchName,
    defaultBranch: false,
    // Created at is set by Firestore because the webhook payload
    // doesn't include a timestamp. In theory, someone could have
    // created a branch locally, and then pushed it some time later,
    // but we'll just show the time when the branch was published.
    created_at: new Date().toISOString(),
    // Transition to using this property eventually
    createdAt: firestoreTimestamp(new Date().toISOString()),
    timestamp: new Date().getTime(),
    checkSuiteRuns: 0,
    checkSuiteFailures: 0,
    checkSuiteStatus: 'neutral',
    createdBy: await getRealName(createdBy),
    createdByUsername: createdBy,
    tracked: false,
  };

  try {
    await branchRef.create(branchInfo);
  } catch (e) {
    functions.logger.error('Could not create new branch document', e);
  }
}
