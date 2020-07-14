import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

import { CheckSuitePayload, handleCheckSuiteEvent } from './checkSuite';
import { CreateEventPayload, handleCreateEvent } from './createEvent';
import { DeleteEventPayload, handleDeleteEvent } from './deleteEvent';
import { handleCheckRunEvent, CheckRunPayload } from './checkRun';
import { BranchInfo } from './branchInfo';
import {
  handlePullRequestEvent,
  PullRequestEventPayload,
} from './pullRequestEvent';

admin.initializeApp();

export const webhook = functions.https.onRequest(async (request, response) => {
  const eventType = request.header('X-Github-Event');

  console.log({ eventType });

  switch (eventType) {
    case 'create':
      await handleCreateEvent(request.body as CreateEventPayload);
      break;

    case 'delete':
      await handleDeleteEvent(request.body as DeleteEventPayload);
      break;

    case 'check_suite':
      await handleCheckSuiteEvent(request.body as CheckSuitePayload);
      break;

    case 'check_run':
      await handleCheckRunEvent(request.body as CheckRunPayload);
      break;

    case 'pull_request':
      await handlePullRequestEvent(request.body as PullRequestEventPayload);
      break;
  }

  response.status(200).send('Thanks');
});

// Run every Friday at 3:15pm Eastern Time
export const oldBranchesNotification = functions.pubsub
  .schedule('45 9 * * 1')
  .timeZone('America/New_York')
  .onRun(async context => {
    const today = new Date().getTime();

    const oneDayInMs = 1000 * 60 * 60 * 24;
    const tenDaysInMs = 10 * oneDayInMs;
    const tenDaysAgo = today - tenDaysInMs;

    const allBranches = await admin
      .firestore()
      .collection('branches')
      .where('timestamp', '<', tenDaysAgo)
      .get();

    const oldBranches: BranchInfo[] = [];

    allBranches.forEach(async branch => {
      const branchInfo = branch.data() as BranchInfo;

      oldBranches.push(branchInfo);
    });

    const branchList: string = oldBranches.reduce((list, branch) => {
      return (
        list +
        `<div>${branch.branchName} last updated ${new Date(
          branch.timestamp
        ).toLocaleDateString()} by ${branch.head_commit?.author.name}</div>`
      );
    }, '');

    sgMail.setApiKey(functions.config().sendgrid.key);
    // console.log('Sending to email', functions.config().sendgrid.email);

    const msg = {
      to: 'lead_devs@ideacrew.com',
      cc: 'mark.goho@ideacrew.com',
      from: 'active-branch-tracker@no-reply.com',
      subject: `Stale Branch Report for week ending ${new Date().toLocaleDateString()}`,
      html: branchList,
    };
    try {
      await sgMail.send(msg);
      return null;
    } catch (error) {
      return null;
    }
  });

export const addTimestampToAllBranches = functions.https.onRequest(
  async (request, response) => {
    const allBranches = await admin.firestore().collection('branches').get();

    allBranches.forEach(async branch => {
      const { updated_at } = branch.data() as BranchInfo;
      const branchUpdated = new Date(updated_at || 'January 1, 1970').getTime();

      await branch.ref.update({
        updatedAt: branchUpdated,
      });
    });

    response.status(200).send('Thanks');
  }
);
