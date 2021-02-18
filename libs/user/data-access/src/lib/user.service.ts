import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

import { AuthService } from '@idc/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid$ = this.auth.user$.pipe(
    filter<firebase.User | null>(Boolean),
    map(user => user?.uid),
  );

  user$ = this.uid$.pipe(
    switchMap(uid => this.afs.collection(`users`).doc(uid).valueChanges()),
  );

  constructor(private afs: AngularFirestore, private auth: AuthService) {}
}
