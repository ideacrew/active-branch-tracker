import * as admin from 'firebase-admin';
import { Repository, Sender, Organization } from './webhookPayload';
import { createSafeBranchName } from './safeBranchName';

export interface DeleteEventPayload {
  ref: string; // branch name
  ref_type: 'branch' | 'tag'; // type of thing that got deleted
  pusher_type: string;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export async function handleDeleteEvent(
  payload: DeleteEventPayload
): Promise<any> {
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
      console.error(e);
    }
  }

  return Promise.resolve();
}
