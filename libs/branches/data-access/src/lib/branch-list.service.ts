import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BranchInfo } from '@idc/util';

import { searchBranches } from './search-branches';

const oneMonthInMs = 1000 * 60 * 60 * 24 * 30;
const today = Date.now();
const oneMonthAgo = today - oneMonthInMs;

@Injectable({
  providedIn: 'root',
})
export class BranchListService {
  scream: HTMLAudioElement = new Audio('/assets/trombone.mp3');
  query = new BehaviorSubject<string>('');

  constructor(private afs: AngularFirestore) {}

  queryBranches(): Observable<BranchInfo[]> {
    const branchesReference = this.afs.collection<BranchInfo>('branches', reference =>
      reference.where('timestamp', '>=', oneMonthAgo).orderBy('timestamp'),
    );

    return branchesReference
      .valueChanges({ idField: 'id' })
      .pipe(map(branches => branches.sort(sortByTime)));
    // tap(async (docChange: DocumentChangeAction<BranchInfo>[]) => {
    //   const modified = docChange.filter(change => change.type === 'modified');
    //   let newFailure = false;

    //   for (const branch of modified) {
    //     const { checkSuiteStatus, tracked } = branch.payload.doc.data();
    //     if (
    //       checkSuiteStatus === CheckSuiteConclusion.Failure &&
    //       tracked === true
    //     ) {
    //       newFailure = true;
    //       console.log({ newFailure: branch.payload.doc.data() });
    //     }
    //   }

    //   if (newFailure === true) {
    //     try {
    //       console.log('Playing sound');
    //       await this.playSound();
    //       newFailure = false;
    //     } catch (e) {
    //       console.error('Could not play sound');
    //     }
    //   }
    // }),
  }

  get filteredBranches$(): Observable<BranchInfo[]> {
    return combineLatest([
      this.queryBranches(),
      this.query.asObservable(),
    ]).pipe(
      map(([branches, rawQuery]) => searchBranches({ branches, rawQuery })),
    );
  }

  async trackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: true });
  }

  async untrackBranch(branch: BranchInfo): Promise<void> {
    await this.getBranchRef(branch).update({ tracked: false });
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

const sortByTime = (branchA: BranchInfo, branchB: BranchInfo): number => {
  const recentDateA = branchA.updated_at ?? branchA.created_at;
  const recentDateB = branchB.updated_at ?? branchB.created_at;

  return new Date(recentDateA).getTime() > new Date(recentDateB).getTime()
    ? -1
    : 1;
};
