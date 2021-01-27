import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { UserEntity } from './store/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  async getUserOnce(uid: string): Promise<UserEntity | undefined> {
    return this.afs
      .doc<UserEntity>(`users/${uid}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }
}
