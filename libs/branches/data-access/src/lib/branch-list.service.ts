import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BranchInfo, CheckSuiteConclusion, ReleaseDateInfo } from '@idc/util';
import { BranchesEntity } from './store/branches.models';

@Injectable()
export class BranchListService {
  branchInfo$: Observable<BranchInfo[]>;
  scream: HTMLAudioElement = new Audio('/assets/HarshaYellr.wav');

  constructor(private afs: AngularFirestore) {
  }

  queryBranches(): Observable<BranchesEntity[]> {
    return this.afs
      .collection<BranchInfo>('branches')
      .snapshotChanges()
      .pipe(
        tap(async (docChange: DocumentChangeAction<BranchInfo>[]) => {
          const modified = docChange.filter(
            change => change.type === 'modified',
          );
          let newFailure = false;

          for (const branch of modified) {
            const { checkSuiteStatus, tracked } = branch.payload.doc.data();
            if (
              checkSuiteStatus === CheckSuiteConclusion.Failure &&
              tracked === true
            ) {
              newFailure = true;
              console.log({ newFailure: branch.payload.doc.data() });
            }
          }

          if (newFailure === true) {
            try {
              await this.playSound();
            } catch (e) {
              console.error('Could not play sound');
            }
          }
        }),
        map((docChange: DocumentChangeAction<BranchInfo>[]) =>
          docChange.map(doc => {
            const data = doc.payload.doc.data();

            return { id: doc.payload.doc.id, ...data };
          }),
        ),
      );
  }

  async trackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: true });
  }

  async untrackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: false });
  }

  getBranchRef(branch: BranchInfo): AngularFirestoreDocument<BranchInfo> {
    const { organizationName, repositoryName, branchName } = branch;

    return this.afs
      .collection<BranchInfo>('branches')
      .doc<BranchInfo>(`${organizationName}-${repositoryName}-${branchName}`);
  }

  async playSound(): Promise<void> {
    await this.scream.play();
  }
}
