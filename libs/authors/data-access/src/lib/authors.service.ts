import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
