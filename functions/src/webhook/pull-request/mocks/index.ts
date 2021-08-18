import { PullRequestEventPayload } from '../interfaces/pullRequestPayload';

import openedPayload from './opened.json';
import synchronizedPayload from './synchronize.json';
import closedNotMergedPayload from './closed-not-merged.json';
import closedAndMergedPayload from './closed-and-merged.json';
import draftPayload from './converted-to-draft.json';
import readyForReviewPayload from './ready-for-review.json';

export const mockOpenedPayload = openedPayload as PullRequestEventPayload;

export const mockSynchronizedPayload =
  synchronizedPayload as PullRequestEventPayload;

export const mockClosedNotMergedPayload =
  closedNotMergedPayload as PullRequestEventPayload;

export const mockClosedAndMergedPayload =
  closedAndMergedPayload as PullRequestEventPayload;

export const mockDraftPayload = draftPayload as PullRequestEventPayload;

export const mockReadyForReviewPayload =
  readyForReviewPayload as PullRequestEventPayload;
