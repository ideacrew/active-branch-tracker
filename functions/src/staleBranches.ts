import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import * as functions from 'firebase-functions';
import { BranchInfo } from './branchInfo';

export async function staleBranches(
  context: functions.EventContext,
): Promise<void> {
  // can only use forEach to loop
  const oldBranches = await getStaleBranchesFromDB();

  const branchList: string = oldBranches.reduce(generateBranchList, '');

  try {
    await sendMail(branchList);
  } catch (error) {
    console.error(error);
    return Promise.resolve();
  }
}

export async function getStaleBranchesFromDB(): Promise<BranchInfo[]> {
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

  allBranches.forEach(async branch =>
    oldBranches.push(branch.data() as BranchInfo),
  );

  return oldBranches;
}

function generateBranchList(list: string, branch: BranchInfo): string {
  return (
    list +
    `<div>${branch.branchName} last updated ${new Date(
      branch.timestamp,
    ).toLocaleDateString()} by ${branch.head_commit?.author.name}</div>`
  );
}

async function sendMail(branchList: string) {
  sgMail.setApiKey(functions.config().sendgrid.key);
  const msg: sgMail.MailDataRequired = {
    to: 'lead_devs@ideacrew.com',
    cc: 'mark.goho@ideacrew.com',
    from: 'active-branch-tracker@no-reply.com',
    subject: `Stale Branch Report for week ending ${new Date().toLocaleDateString()}`,
    html: branchList,
  };
  return await sgMail.send(msg);
}
