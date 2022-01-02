import * as admin from 'firebase-admin';

export const firestoreTimestamp = (
  date: string,
): FirebaseFirestore.Timestamp => {
  const d = new Date(date);

  return admin.firestore.Timestamp.fromDate(d);
};
