import * as admin from 'firebase-admin';

export const firestoreTimestamp = (
  date: Date = new Date(),
): FirebaseFirestore.Timestamp => {
  return admin.firestore.Timestamp.fromDate(date);
};
