import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { FSPullRequest } from './models';

@Injectable()
export class PullRequestListService {
  constructor(private afs: AngularFirestore) {}

  queryPullRequests(): Observable<FSPullRequest[]> {
    const pullRequestsReference = this.afs.collection<FSPullRequest>(
      'pullRequests',
      ref => ref.orderBy('createdAt'),
    );

    return pullRequestsReference.valueChanges();
  }
}
