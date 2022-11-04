import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FSPullRequest } from '@idc/pull-requests/data-access';
import { Observable } from 'rxjs';
import { Author } from './author';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private afs: AngularFirestore) {}

  queryAuthorList(): Observable<Author[]> {
    const authorListReference = this.afs.collection<Author>('authors');

    return authorListReference.valueChanges();
  }

  getPullRequestsByAuthor(authorId: string): Observable<FSPullRequest[]> {
    const pullRequestsByAuthorReference = this.afs.collection<FSPullRequest>(
      `authors/${authorId}/pullRequests`,
      reference => reference.orderBy('createdAt', 'desc'),
    );

    return pullRequestsByAuthorReference.valueChanges();
  }
}
