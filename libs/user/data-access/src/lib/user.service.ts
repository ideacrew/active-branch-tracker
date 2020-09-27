import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { UserEntity } from './store/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  getUserRef(uid: string): Observable<UserEntity | undefined> {
    return this.afs.doc<UserEntity>(`users/${uid}`).valueChanges();
  }
}