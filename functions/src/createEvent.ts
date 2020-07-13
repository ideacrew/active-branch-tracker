import * as admin from 'firebase-admin';

import { Repository, Organization, Sender } from './webhookPayload';
import { BranchInfo } from './branchInfo';
import { CheckConclusion } from './checkConclusion';
import { createSafeBranchName } from './safeBranchName';

export interface CreateEventPayload {
  ref: string; // name of thing that got created
  ref_type: 'branch' | 'tag'; // type of thing that got created
  master_branch: string;
  description: any;
  pusher_type: 'user';
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export async function handleCreateEvent(
  payload: CreateEventPayload
): Promise<any> {
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
    checkSuiteStatus: CheckConclusion.Neutral,
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
