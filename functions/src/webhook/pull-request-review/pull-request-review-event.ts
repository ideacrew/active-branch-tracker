/* eslint-disable camelcase */
import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
// eslint-disable-next-line import/no-unresolved
import { FieldValue } from 'firebase-admin/firestore';

import { PullRequestReviewPayload } from './interfaces';
import { firestoreTimestamp } from '../../util';

import { defaultBranches } from '../default-branches';

export const handlePullRequestReviewEvent = async (
  payload: PullRequestReviewPayload,
): Promise<void> => {
  const { pull_request, action, organization, repository } = payload;

  // Don't save PRs from Dependabot or PRs that aren't against the default branch
  if (
    pull_request.user.login.includes('bot') ||
    !defaultBranches.has(pull_request.base.ref)
  ) {
    return;
  }

  const pullRequestId = `${organization.login}-${repository.name}-${pull_request.number}`;

  const pullRequestReference = firestore()
    .collection('pullRequests')
    .doc(pullRequestId);

  const authorReference = firestore()
    .collection('authors')
    .doc(pull_request.user.login)
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

      const updatedPR = {
        reviews: FieldValue.arrayUnion(reviewInfo),
      };

      batch.set(pullRequestReference, updatedPR, { merge: true });
      batch.set(authorReference, updatedPR, { merge: true });

      if (review.state === 'approved') {
        const { base, head } = pull_request;

        const updatedPR = {
          approvedAt: firestoreTimestamp(new Date(review.submitted_at)),
          approvedBy: review.user.login,
          branchName: head.ref,
          targetBranch: base.ref,
        };

        batch.set(pullRequestReference, updatedPR, { merge: true });
        batch.set(authorReference, updatedPR, { merge: true });
      }

      break;
    }

    default: {
      functions.logger.info(
        'Fallthrough case in Pull Request Review Event',
        action,
      );
    }
  }

  await batch.commit();
};
