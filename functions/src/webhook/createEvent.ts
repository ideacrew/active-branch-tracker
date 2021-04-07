/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as admin from 'firebase-admin';

import { BranchInfo } from '../models/branchInfo';
import { createSafeBranchName } from '../safeBranchName';
import { CreateEventPayload } from './interfaces';

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
    created_at: new Date().toISOString(),
    checkSuiteRuns: 0,
    checkSuiteFailures: 0,
    checkSuiteStatus: 'neutral',
    createdBy,
    tracked: false,
    timestamp: new Date().getTime(),
  };

  try {
    await branchRef.create(branchInfo);
  } catch (e) {
    console.error(e);
  }
}
