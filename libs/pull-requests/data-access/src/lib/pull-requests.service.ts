import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PullRequest } from './models/pullRequest';

@Injectable({
  providedIn: 'root',
})
export class PullRequestsService {
  sortedPullRequests$ = this.queryPullRequests().pipe(
    map(pullRequests =>
      pullRequests.sort((a: PullRequest, b: PullRequest) =>
        a.updatedAt.toMillis() > b.updatedAt.toMillis() ? 1 : -1,
      ),
    ),
  );

  constructor(private afs: AngularFirestore) {}

  private queryPullRequests(): Observable<PullRequest[]> {
    return this.afs
      .collection<PullRequest>('pullRequests', ref =>
        ref.where('closed', '==', false),
      )
      .valueChanges();
  }
}
