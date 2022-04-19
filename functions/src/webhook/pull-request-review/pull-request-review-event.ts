/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import { PullRequestReviewPayload } from './interfaces';
import { firestoreTimestamp } from '../../util';

export const handlePullRequestReviewEvent = async (
  payload: PullRequestReviewPayload,
): Promise<void> => {
  const { pull_request, action, organization, repository } = payload;

  // Don't save PRs from Dependabot or PRs that aren't against trunk
  if (
    pull_request.user.login.includes('bot') ||
    pull_request.base.ref !== 'trunk'
  ) {
    return;
  }

  const pullRequestId = `${organization.login}-${repository.name}-${pull_request.number}`;

  const pullRequestReference = firestore()
    .collection('pullRequests')
    .doc(pullRequestId);

  const batch = firestore().batch();

  switch (action) {
    case 'submitted': {
      const { review, pull_request } = payload;

      const reviewInfo = {
        author: review.user.login,
        body: review.body,
        state: review.state,
        submittedAt: firestoreTimestamp(new Date(review.submitted_at)),
        url: review.html_url,
      };

      batch.set(
        pullRequestReference,
        {
          reviews: firestore.FieldValue.arrayUnion(reviewInfo),
        },
        { merge: true },
      );

      if (review.state === 'approved') {
        const { base, head } = pull_request;

        batch.set(
          pullRequestReference,
          {
            approvedAt: firestoreTimestamp(new Date(review.submitted_at)),
            approvedBy: review.user.login,
            branchName: head.ref,
            targetBranch: base.ref,
          },
          { merge: true },
        );
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
