import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BranchInfo, CheckSuiteConclusion, BranchStatus } from '@idc/util';
import { BranchesEntity } from './store/branches.models';

@Injectable()
export class BranchListService {
  branchInfo$: Observable<BranchInfo[]>;
  scream: HTMLAudioElement = new Audio('/assets/trombone.mp3');

  constructor(private afs: AngularFirestore) {}

  queryBranches(): Observable<BranchesEntity[]> {
    console.log('Query Branches method being run');
    const oneMonthInMs = 1000 * 60 * 60 * 24 * 30;
    const today = new Date().getTime();
    const oneMonthAgo = today - oneMonthInMs;
    const branchesRef = this.afs.collection<BranchInfo>('branches', ref =>
      ref.where('timestamp', '>=', oneMonthAgo).orderBy('timestamp'),
    );

    return branchesRef.snapshotChanges().pipe(
      tap(async (docChange: DocumentChangeAction<BranchInfo>[]) => {
        const modified = docChange.filter(change => change.type === 'modified');
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
            console.log('Playing sound');
            await this.playSound();
            newFailure = false;
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

  async setBranchStatus(branchId: string, status: BranchStatus): Promise<void> {
    await this.getSimpleRef(branchId).update({ status });
  }

  getSimpleRef(branchId: string): AngularFirestoreDocument<BranchInfo> {
    return this.afs.collection<BranchInfo>('branches').doc(branchId);
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
