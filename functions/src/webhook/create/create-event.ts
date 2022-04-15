/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { BranchInfo } from '../../models';
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
  const batch = admin.firestore().batch();

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

  const namedBranchReference = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${branchName}`);

  const branchInfo: BranchInfo = {
    branchName,
    createdAt: firestoreTimestamp(),
    createdBy,
    defaultBranch: branchName === master_branch,
    organizationName,
    repositoryName,
    timestamp: Date.now(),
    tracked: false,
    workflowResults: [],
  };

  batch.create(namedBranchReference, branchInfo);

  try {
    await batch.commit();
  } catch (error) {
    functions.logger.error('Could not create new branch document', error);
  }
}
