import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/app';

import { AuthService } from '@idc/auth';
import { YellrUser } from './models/yellrUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid$ = this.auth.user$.pipe(
    filter<firebase.User | null>(Boolean),
    map(user => user?.uid),
  );

  user$ = this.uid$.pipe(
    switchMap(uid =>
      this.afs
        .collection<YellrUser>(`users`)
        .doc(uid)
        .valueChanges()
        .pipe(tap(user => this.isAdmin.next(user?.role === 'admin'))),
    ),
  );

  isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();

  constructor(private afs: AngularFirestore, private auth: AuthService) {}
}
