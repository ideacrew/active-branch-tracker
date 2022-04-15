/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { PullRequestReviewPayload } from './interfaces';
import { firestoreTimestamp } from '../../util';

export const handlePullRequestReviewEvent = async (
  payload: PullRequestReviewPayload,
): Promise<void> => {
  const { pull_request, action, organization, repository } = payload;

  const pullRequestId = `${organization.login}-${repository.name}-${pull_request.number}`;

  const pullRequestReference = firestore()
    .collection('pullRequests')
    .doc(pullRequestId);

  const batch = firestore().batch();

  switch (action) {
    case 'submitted': {
      const { review } = payload;

      const reviewInfo = {
        author: review.user.login,
        body: review.body,
        state: review.state,
        submittedAt: firestoreTimestamp(new Date(review.submitted_at)),
        url: review.html_url,
      };

      batch.update(pullRequestReference, {
        reviews: firestore.FieldValue.arrayUnion(reviewInfo),
      });

      if (review.state === 'approved') {
        batch.update(pullRequestReference, {
          approvedAt: firestoreTimestamp(new Date(review.submitted_at)),
          approvedBy: review.user.login,
        });
      }

      break;
    }

    default:
      functions.logger.info(
        'Fallthrough case in Pull Request Review Event',
        action,
      );
  }

  await batch.commit();
};
