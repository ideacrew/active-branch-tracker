import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { FSPullRequest } from './models';

@Injectable()
export class PullRequestListService {
  constructor(private afs: AngularFirestore) {}

  today = new Date();
  last30Days = new Date(this.today.getTime() - 30 * 24 * 60 * 60 * 1000);

  queryPullRequests(): Observable<FSPullRequest[]> {
    const pullRequestsReference = this.afs.collection<FSPullRequest>(
      'pullRequests',
      ref => ref.where('mergedAt', '>', this.last30Days),
    );

    return pullRequestsReference.valueChanges();
  }
}
