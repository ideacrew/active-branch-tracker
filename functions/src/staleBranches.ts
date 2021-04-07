import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

import * as sgMail from '@sendgrid/mail';
import { ClientResponse } from '@sendgrid/client/src/response';

import { BranchInfo } from './models/branchInfo';

/**
 * Gets stale branches
 * @param {functions.EventContext} _context unused
 * @return {Promise<void>}
 */
export async function staleBranches(): Promise<void> {
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

/**
 * Gets stale branches from the DB
 * @return {Promise<BranchInfo[]>}
 */
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

/**
 * Generates a list of branches
 * @param {string} list
 * @param {BranchInfo} branch
 * @return {string}
 */
function generateBranchList(list: string, branch: BranchInfo): string {
  return (
    list +
    `<div>${branch.branchName} last updated ${new Date(
      branch.timestamp,
    ).toLocaleDateString()} by ${branch.head_commit?.author.name}</div>`
  );
}

/**
 *
 * @param {string} branchList The branch list in string form
 * @return {Promise<[ClientResponse, unknown]>}
 */
async function sendMail(
  branchList: string,
): Promise<[ClientResponse, unknown]> {
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
