// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';

import { IssueCommentPayload } from './interfaces/issue-comment-payload';

export const handleCreatedIssueComment = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload: IssueCommentPayload,
): Promise<void> => {
  // try {
  //   await admin
  //     .firestore()
  //     .collection(`branches`)
  //     .doc(`${organizationName}-${repositoryName}-${branchName}`)
  //     .update({ pullRequestNumber });
  // } catch (e) {
  //   functions.logger.error(e);
  // }
};
