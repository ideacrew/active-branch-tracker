import * as admin from 'firebase-admin';
import { Repository, Sender, Organization } from '../webhookPayload';
import { createSafeBranchName } from '../safeBranchName';
import { MailDataRequired } from '@sendgrid/mail';
import { sendMail } from '../send-grid/send-email';

export interface DeleteEventPayload {
  ref: string; // branch name
  ref_type: 'branch' | 'tag'; // type of thing that got deleted
  pusher_type: string;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export async function handleDeleteEvent(
  payload: DeleteEventPayload,
): Promise<any> {
  const { ref: branchName, repository, organization } = payload;

  const safeBranchName = createSafeBranchName(branchName);

  const { name: repositoryName } = repository;
  const { login: organizationName } = organization;

  const mail: MailDataRequired = {
    to: 'mark.goho@ideacrew.com',
    from: 'mark.goho@ideacrew.com',
    subject: `Deletion event for branch ${organizationName}-${repositoryName}-${safeBranchName}`,
    text: '',
  };

  const branchRef = admin
    .firestore()
    .collection('branches')
    .doc(`${organizationName}-${repositoryName}-${safeBranchName}`);

  const branch = await branchRef.get();

  if (branch.exists) {
    try {
      await branchRef.delete();
      mail.text = 'Branch successfully deleted.';
    } catch (e) {
      console.error(e);
      mail.text = `Branch was unable to be deleted. Error: ${e}`;
    }
  } else {
    mail.text = 'Branch did not exist at time of deletion event.';
  }

  await sendMail(mail);

  return Promise.resolve();
}
