import * as admin from 'firebase-admin';
import { createSafeBranchName } from '../safe-branch-name';

export interface BranchReference {
  organizationName: string;
  repositoryName: string;
  branchName: string;
}

/**
 * Takes a branch ref object and returns a document reference
 * @param {BranchRef} branchRef
 * @return {FirebaseFirestore.DocumentReference} a doc reference
 */
export function getBranchReference({
  organizationName,
  repositoryName,
  branchName,
}: BranchReference): FirebaseFirestore.DocumentReference {
  const safeBranchName = createSafeBranchName(branchName);

  return admin
    .firestore()
    .collection(`branches`)
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);
}
