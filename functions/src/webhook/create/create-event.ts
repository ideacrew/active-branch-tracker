/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { BranchInfo } from '../../models/branch-info';
import { createSafeBranchName } from '../../safe-branch-name';
import { firestoreTimestamp } from '../../util';
import { CreateEventPayload } from './interfaces/create-event-payload';

/**
 * Handles a create event from GitHub Actions
 * @param {CreateEventPayload} payload
 * @return {Promise<void>} promise
 */
export async function handleCreateEvent(
  payload: CreateEventPayload,
): Promise<void> {
  const {
    ref: unsafeBranchName,
    repository,
    organization,
    sender,
    master_branch,
  } = payload;

  const branchName = createSafeBranchName(unsafeBranchName);

  const { login: createdBy } = sender;
  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const branchReference = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${branchName}`);

  const branchInfo: BranchInfo = {
    branchName,
    createdAt: firestoreTimestamp(new Date().toISOString()),
    createdBy,
    defaultBranch: branchName === master_branch,
    organizationName,
    repositoryName,
    timestamp: Date.now(),
    tracked: false,
    workflowResults: [],
  };

  try {
    await branchReference.create(branchInfo);
  } catch (error) {
    functions.logger.error('Could not create new branch document', error);
  }
}
