// eslint-disable-next-line import/no-unresolved
import { Timestamp } from 'firebase-admin/firestore';

export const firestoreTimestamp = (
  date: Date = new Date(),
): FirebaseFirestore.Timestamp => {
  return Timestamp.fromDate(date);
};
