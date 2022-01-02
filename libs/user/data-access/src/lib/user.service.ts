import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@idc/auth';
import { filterNullish } from '@idc/util';

import { YellrUser } from './models/yellr-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid$ = this.auth.user$.pipe(
    filterNullish(),
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
