// Provided by Firebase Documentation at
// https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
export const deleteCollection = async (
  database: FirebaseFirestore.Firestore,
  collectionPath: string,
  batchSize = 100,
): Promise<unknown> => {
  const collectionReference = database.collection(collectionPath);
  const query = collectionReference.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(database, query, resolve).catch(reject);
  });
};

const deleteQueryBatch = async (
  database: FirebaseFirestore.Firestore,
  query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: any,
) => {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = database.batch();
  for (const document of snapshot.docs) {
    batch.delete(document.ref);
  }
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(database, query, resolve);
  });
};
