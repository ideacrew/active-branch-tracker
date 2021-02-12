import { MailDataRequired, send, setApiKey } from '@sendgrid/mail';
import * as functions from 'firebase-functions';

/**
 * Sends the email
 * @param {MailDataRequired} email
 */
export async function sendMail(email: MailDataRequired): Promise<void> {
  setApiKey(functions.config().sendgrid.key);

  await send(email);
}
