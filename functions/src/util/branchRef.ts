import * as admin from 'firebase-admin';
import { createSafeBranchName } from '../safeBranchName';

export interface BranchRef {
  organizationName: string;
  repositoryName: string;
  branchName: string;
}

export function getBranchRef({
  organizationName,
  repositoryName,
  branchName,
}: BranchRef): FirebaseFirestore.DocumentReference {
  const safeBranchName = createSafeBranchName(branchName);

  return admin
    .firestore()
    .collection(`branches`)
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);
}
