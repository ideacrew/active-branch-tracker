import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { PullRequest } from './models/pullRequest';

@Injectable({
  providedIn: 'root',
})
export class PullRequestsService {
  constructor(private afs: AngularFirestore) {}

  queryPullRequests(): Observable<PullRequest[]> {
    return this.afs.collection<PullRequest>('pullRequests').valueChanges();
  }
}
