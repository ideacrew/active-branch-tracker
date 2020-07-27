import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BranchInfo } from './branchInfo';
import { ReleaseDateInfo } from './branchReleaseInfo';
import { CheckSuiteConclusion } from './checkSuiteConclusion';

@Injectable({
  providedIn: 'root',
})
export class BranchListService {
  branchInfo$: Observable<BranchInfo[]>;
  scream: HTMLAudioElement = new Audio('/assets/HarshaYellr.wav');

  private rawBranchData$: Observable<DocumentChangeAction<BranchInfo>[]>;

  constructor(private afs: AngularFirestore) {
    this.rawBranchData$ = this.afs
      .collection<BranchInfo>('branches')
      .snapshotChanges()
      .pipe(
        tap(async docChange => {
          const modified = docChange.filter(
            change => change.type === 'modified'
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
        })
      );

    this.branchInfo$ = this.rawBranchData$.pipe(
      map(docChange => docChange.map(change => change.payload.doc.data()))
    );
  }

  async trackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: true });
  }

  async untrackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: false });
  }

  async addReleaseDate({
    branch,
    releaseDate,
  }: ReleaseDateInfo): Promise<void> {
    await this.getBranchRef(branch).update({
      releaseDate: releaseDate.getTime(),
    });
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
